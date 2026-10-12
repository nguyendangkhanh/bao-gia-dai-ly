import { PaginatedResponse, Product } from "@/types/product";
import https from "node:https";
import { unstable_cache } from "next/cache";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.BACKEND_BEARER_TOKEN;

function normalizeBaseUrl(baseUrl: string) {
  const clean = baseUrl.replace(/\/+$/, "");
  return clean.endsWith("/api") ? clean.slice(0, -4) : clean;
}

function normalizeAuthHeader(token: string) {
  return token.trim().startsWith("Bearer ") ? token.trim() : `Bearer ${token.trim()}`;
}

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 20 * 1024 * 1024; // 20 MB

function isLocalSelfSigned(url: string) {
  return url.startsWith("https://localhost") || url.startsWith("https://127.0.0.1");
}

function fetchWithLocalHttpsBypass(
  url: string,
  authorization: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    let timer: NodeJS.Timeout | null = null;
    let settled = false;

    const cleanup = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const doneError = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      req.destroy();
      reject(err);
    };

    const doneSuccess = (res: Response) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(res);
    };

    const req = https.request(
      url,
      {
        method: "GET",
        rejectUnauthorized: false,
        headers: {
          Authorization: authorization,
          Accept: "application/json",
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        let totalBytes = 0;

        res.on("data", (chunk: Buffer | Uint8Array) => {
          const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          totalBytes += buf.length;
          if (totalBytes > MAX_RESPONSE_BYTES) {
            doneError(new Error(`Response exceeded maximum size of ${MAX_RESPONSE_BYTES} bytes`));
            return;
          }
          chunks.push(buf);
        });

        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf-8");
          chunks.length = 0; // free buffer array immediately
          doneSuccess(
            new Response(body, {
              status: res.statusCode || 500,
              headers: {
                "content-type": res.headers["content-type"] || "application/json",
              },
            }),
          );
        });

        res.on("error", (err) => {
          doneError(err);
        });
      },
    );

    timer = setTimeout(() => {
      doneError(new Error(`Backend request timeout after ${timeoutMs}ms: ${url}`));
    }, timeoutMs);

    req.on("error", (err) => {
      doneError(err);
    });

    req.end();
  });
}

async function request<T>(path: string): Promise<T> {
  if (!API_BASE_URL || !API_TOKEN) {
    throw new Error("Thiếu NEXT_PUBLIC_API_BASE_URL hoặc BACKEND_BEARER_TOKEN");
  }

  const baseUrl = normalizeBaseUrl(API_BASE_URL);
  const authorization = normalizeAuthHeader(API_TOKEN);
  const url = `${baseUrl}${path}`;

  const res = isLocalSelfSigned(baseUrl)
    ? await fetchWithLocalHttpsBypass(url, authorization, DEFAULT_TIMEOUT_MS)
    : await fetch(url, {
        headers: {
          Authorization: authorization,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
      });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}

export async function getProducts(page = 1, limit = 10, search = "") {
  return unstable_cache(
    async () => {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) query.set("search", search);
      return request<PaginatedResponse<Product>>(`/api/products?${query.toString()}`);
    },
    ["products-list", String(page), String(limit), search],
    { revalidate: 300, tags: ["products"] }
  )();
}

export async function getProductById(id: string) {
  return unstable_cache(
    async () => {
      const res = await request<{ data: Product }>(`/api/products/${id}`);
      return res.data;
    },
    ["product-detail", id],
    { revalidate: 300, tags: [`product-${id}`] }
  )();
}

export interface SkuOrderItem {
  sku: string;
  position: number;
  link?: string;
}

export async function getSkuOrder() {
  const rawUrl = process.env.SKU_ORDER_API_URL;
  if (!rawUrl) {
    throw new Error("Thiếu SKU_ORDER_API_URL");
  }

  const baseUrl = rawUrl.endsWith("/sku-order") ? rawUrl : `${rawUrl.replace(/\/+$/, "")}/sku-order`;
  const url = baseUrl;
  const res = await fetch(url, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`SKU order API error ${res.status}`);
  }

  const data = (await res.json()) as { items?: SkuOrderItem[] };
  return Array.isArray(data.items) ? data.items : [];
}

/**
 * Execute an async mapping function with a concurrency limit.
 * Preserves the order of output results according to input items.
 */
export async function mapConcurrent<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = 6,
): Promise<R[]> {
  if (items.length === 0) return [];
  const results = new Array<R>(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await fn(items[idx], idx);
    }
  }

  const workerCount = Math.min(Math.max(1, concurrency), items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  return results;
}

