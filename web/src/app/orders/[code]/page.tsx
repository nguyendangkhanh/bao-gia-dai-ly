import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import OrderConfirmationClient from "./OrderConfirmationClient";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { code } = await params;

  return <OrderConfirmationClient code={code} dealerName={session.shortName} />;
}
