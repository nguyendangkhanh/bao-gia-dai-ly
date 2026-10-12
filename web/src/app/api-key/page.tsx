import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getApiKeyStatusForDealer } from "@/lib/dealer-api-keys";
import ApiKeyManager from "@/components/api-key/ApiKeyManager";
import ApiDocs from "@/components/api-key/ApiDocs";

export default async function ApiKeyPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [status, h] = await Promise.all([getApiKeyStatusForDealer(session.shortName), headers()]);
  const host = h.get("host") || "localhost:3009";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5 overflow-x-hidden p-4 md:p-6 fade-in">
      <section className="rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#f97316] to-[#e63946] p-5 text-white shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">🔑 API cho đại lý</h1>
            <p className="mt-1 text-sm text-white/90">
              Lấy API key để tự code website riêng, đồng bộ giá/sản phẩm theo đúng nhóm giá của bạn (
              {session.priceTier === "agent1" ? "Đại lý 1" : "Đại lý 2"}).
            </p>
          </div>
          <Link href="/products" className="rounded-lg border border-white/60 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 shrink-0">
            ← Về danh sách sản phẩm
          </Link>
        </div>
      </section>

      <ApiKeyManager initialStatus={status} />
      <ApiDocs baseUrl={baseUrl} />
    </main>
  );
}
