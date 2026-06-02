import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { Product } from "@/types/product";

export type PriceTier = "agent1" | "agent2";

export type PriceSnapshotVariant = {
  variantId: number;
  sku: string | null;
  barcode: string | null;
  displayName: string | null;
  price: number | null;
  agentPrice1: number | null;
  agentPrice2: number | null;
};

export type PriceSnapshotProduct = {
  productId: number;
  productName: string;
  variants: PriceSnapshotVariant[];
};

export type PriceSnapshot = {
  version: string;
  createdAt: string;
  products: PriceSnapshotProduct[];
};

export type PriceAcknowledgement = {
  dealerShortName: string;
  snapshotVersion: string;
  acknowledgedAt: string;
  priceTier: PriceTier;
};

type PriceAcknowledgementStore = {
  acknowledgements: PriceAcknowledgement[];
};

type PriceDelta = {
  oldValue: number | null;
  newValue: number | null;
  amount: number;
  direction: "increased" | "decreased";
};

export type DealerPriceNotificationItem = {
  productId: number;
  productName: string;
  variantId: number;
  variantLabel: string;
  retailChange: PriceDelta | null;
  dealerChange: PriceDelta | null;
  profitBefore: number;
  profitAfter: number;
  profitDelta: number;
  profitImpact: "positive" | "negative" | "neutral";
  profitMessage: string;
};

export type DealerPriceNotification = {
  snapshotVersion: string;
  detectedAt: string;
  title: string;
  summary: string;
  items: DealerPriceNotificationItem[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const SNAPSHOT_FILE = path.join(DATA_DIR, "product-price-snapshot.json");
const ACK_FILE = path.join(DATA_DIR, "dealer-price-acknowledgements.json");

function normalizeNumber(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function buildVariantLabel(variant: Pick<PriceSnapshotVariant, "displayName" | "sku" | "barcode" | "variantId">) {
  return String(variant.displayName || variant.sku || variant.barcode || `Variant ${variant.variantId}`).trim();
}

function getDealerPrice(variant: Pick<PriceSnapshotVariant, "agentPrice1" | "agentPrice2">, priceTier: PriceTier) {
  return normalizeNumber(priceTier === "agent2" ? variant.agentPrice2 : variant.agentPrice1) ?? 0;
}

function buildDelta(oldValue: number | null, newValue: number | null): PriceDelta | null {
  const before = normalizeNumber(oldValue);
  const after = normalizeNumber(newValue);
  if (before === after) return null;

  const amount = Math.abs((after || 0) - (before || 0));
  return {
    oldValue: before,
    newValue: after,
    amount,
    direction: (after || 0) > (before || 0) ? "increased" : "decreased",
  };
}

function buildProfitMessage(profitBefore: number, profitAfter: number) {
  const delta = profitAfter - profitBefore;
  if (delta > 0) {
    return `Lợi nhuận tham chiếu tăng ${delta.toLocaleString("vi-VN")}đ.`;
  }
  if (delta < 0) {
    return `Lợi nhuận tham chiếu giảm ${Math.abs(delta).toLocaleString("vi-VN")}đ.`;
  }
  return "Lợi nhuận tham chiếu không đổi.";
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  await ensureDataDir();
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
}

export function buildPriceSnapshot(products: Product[]): PriceSnapshot {
  const createdAt = new Date().toISOString();

  return {
    version: createdAt,
    createdAt,
    products: products.map((product) => ({
      productId: product.id,
      productName: String(product.name || "").trim(),
      variants: (product.variants || []).map((variant) => ({
        variantId: variant.id,
        sku: variant.sku || null,
        barcode: variant.barcode || null,
        displayName: variant.displayName || null,
        price: normalizeNumber(variant.price),
        agentPrice1: normalizeNumber(variant.agentPrice1),
        agentPrice2: normalizeNumber(variant.agentPrice2),
      })),
    })),
  };
}

export async function readPriceSnapshot() {
  return readJsonFile<PriceSnapshot | null>(SNAPSHOT_FILE, null);
}

export async function writePriceSnapshot(snapshot: PriceSnapshot) {
  await writeJsonFile(SNAPSHOT_FILE, snapshot);
}

async function readAcknowledgements() {
  const store = await readJsonFile<PriceAcknowledgementStore>(ACK_FILE, { acknowledgements: [] });
  return { acknowledgements: Array.isArray(store.acknowledgements) ? store.acknowledgements : [] };
}

async function writeAcknowledgements(store: PriceAcknowledgementStore) {
  await writeJsonFile(ACK_FILE, store);
}

export async function acknowledgePriceNotification(input: { dealerShortName: string; snapshotVersion: string; priceTier: PriceTier }) {
  const store = await readAcknowledgements();
  const existing = store.acknowledgements.find(
    (item) => item.dealerShortName === input.dealerShortName && item.snapshotVersion === input.snapshotVersion,
  );

  if (existing) return;

  store.acknowledgements.push({
    dealerShortName: input.dealerShortName,
    snapshotVersion: input.snapshotVersion,
    priceTier: input.priceTier,
    acknowledgedAt: new Date().toISOString(),
  });

  await writeAcknowledgements(store);
}

function hasAcknowledged(store: PriceAcknowledgementStore, dealerShortName: string, snapshotVersion: string) {
  return store.acknowledgements.some(
    (item) => item.dealerShortName === dealerShortName && item.snapshotVersion === snapshotVersion,
  );
}

export async function getPendingPriceNotificationForDealer(input: {
  dealerShortName: string;
  priceTier: PriceTier;
  products: Product[];
}): Promise<DealerPriceNotification | null> {
  const previousSnapshot = await readPriceSnapshot();
  const nextSnapshot = buildPriceSnapshot(input.products);

  if (!previousSnapshot) {
    await writePriceSnapshot(nextSnapshot);
    return null;
  }

  const previousVariants = new Map<number, { productId: number; productName: string; variant: PriceSnapshotVariant }>();
  for (const product of previousSnapshot.products) {
    for (const variant of product.variants) {
      previousVariants.set(variant.variantId, { productId: product.productId, productName: product.productName, variant });
    }
  }

  const items: DealerPriceNotificationItem[] = [];
  for (const product of nextSnapshot.products) {
    for (const variant of product.variants) {
      const previous = previousVariants.get(variant.variantId);
      if (!previous) continue;

      const retailChange = buildDelta(previous.variant.price, variant.price);
      const previousDealerPrice = getDealerPrice(previous.variant, input.priceTier);
      const nextDealerPrice = getDealerPrice(variant, input.priceTier);
      const dealerChange = buildDelta(previousDealerPrice, nextDealerPrice);
      const profitBefore = Math.max(0, (normalizeNumber(previous.variant.price) ?? 0) - previousDealerPrice);
      const profitAfter = Math.max(0, (normalizeNumber(variant.price) ?? 0) - nextDealerPrice);

      if (!retailChange && !dealerChange) continue;

      items.push({
        productId: product.productId,
        productName: product.productName,
        variantId: variant.variantId,
        variantLabel: buildVariantLabel(variant),
        retailChange,
        dealerChange,
        profitBefore,
        profitAfter,
        profitDelta: profitAfter - profitBefore,
        profitImpact: profitAfter > profitBefore ? "positive" : profitAfter < profitBefore ? "negative" : "neutral",
        profitMessage: buildProfitMessage(profitBefore, profitAfter),
      });
    }
  }

  if (!items.length) return null;

  await writePriceSnapshot(nextSnapshot);

  const acknowledgements = await readAcknowledgements();
  if (hasAcknowledged(acknowledgements, input.dealerShortName, nextSnapshot.version)) {
    return null;
  }

  return {
    snapshotVersion: nextSnapshot.version,
    detectedAt: nextSnapshot.createdAt,
    title: "Thông báo cập nhật giá sản phẩm",
    summary: "Một số sản phẩm đã thay đổi giá bán hoặc giá đại lý. Vui lòng xác nhận đã nắm thông tin trước khi tiếp tục.",
    items,
  };
}
