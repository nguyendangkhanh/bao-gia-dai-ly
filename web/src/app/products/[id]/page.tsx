import Link from "next/link";
import { getProductById } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const product = await getProductById(id);
  const tierKey = session.priceTier === "agent2" ? "agentPrice2" : "agentPrice1";

  const variants = (product.variants || []).filter((v) => {
    const val = tierKey === "agentPrice2" ? v.agentPrice2 : v.agentPrice1;
    return typeof val === "number" && val > 0;
  });

  return (
    <main className="mx-auto w-full max-w-6xl p-6 space-y-4">
      <Link href="/products" className="text-sm underline">← Quay lại danh sách</Link>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-sm text-zinc-600">Vendor: {product.vendor || "-"}</p>
      <p className="text-sm">{product.description || "Không có mô tả"}</p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Biến thể</h2>
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50"><tr><th className="p-2 text-left">Tên</th><th className="p-2 text-left">SKU</th><th className="p-2 text-left">Giá lẻ</th><th className="p-2 text-left">{session.priceTier === "agent1" ? "Đại lý 1" : "Đại lý 2"}</th></tr></thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="p-2">{v.displayName || "-"}</td>
                  <td className="p-2">{v.sku || "-"}</td>
                  <td className="p-2">{(v.price || 0).toLocaleString("vi-VN")}</td>
                  <td className="p-2">{((session.priceTier === "agent1" ? v.agentPrice1 : v.agentPrice2) || 0).toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
