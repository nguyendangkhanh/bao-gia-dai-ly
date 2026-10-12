const DEFAULT_STATIC_BASE_URL = "https://crm.themanson.vn/api/public/";

/**
 * Normalizes an image path or URL by ensuring it includes the full domain.
 * Example: "/uploads/image-123.png" -> "https://crm.themanson.vn/api/public/uploads/image-123.png"
 */
export function resolveImageUrl(url?: string | null): string {
  if (!url) return "";
  let resolved = String(url).trim();
  if (!resolved) return "";

  if (!resolved.startsWith("http://") && !resolved.startsWith("https://")) {
    const rawBase =
      process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL ||
      process.env.UMI_APP_STATIC_FILE_BASE_URL ||
      DEFAULT_STATIC_BASE_URL;
    const base = rawBase.replace(/\/+$/, "");

    let cleanPath = resolved.replace(/^\/+/, "");
    if (cleanPath.startsWith("api/public/")) {
      cleanPath = cleanPath.slice("api/public/".length);
    }
    resolved = `${base}/${cleanPath}`;
  }

  if (resolved.startsWith("https://localhost")) return resolved.replace("https://localhost", "http://localhost");
  if (resolved.startsWith("https://127.0.0.1")) return resolved.replace("https://127.0.0.1", "http://127.0.0.1");
  return resolved;
}
