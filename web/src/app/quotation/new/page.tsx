import { getProducts } from "@/lib/api";
import QuotationBuilder from "@/components/quotation/QuotationBuilder";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewQuotationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const firstPage = await getProducts(1, 50, "");

  return (
    <main className="mx-auto w-full max-w-6xl p-6 space-y-4 fade-in">
      <h1 className="text-2xl font-semibold text-slate-900">Tạo báo giá đại lý</h1>
      <div className="h-1 w-40 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-red-500" />
      <p className="text-sm text-zinc-600">Đại lý: {session.name} • Nhóm: {session.groupName}</p>
      <QuotationBuilder products={firstPage.data} sessionUser={session} />
    </main>
  );
}
