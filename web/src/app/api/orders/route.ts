import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const CRM_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "").replace(/\/api$/, "") || "";
const CRM_TOKEN = process.env.BACKEND_BEARER_TOKEN || "";

function normalizeAuth(token: string) {
  const t = token.trim();
  return t.startsWith("Bearer ") ? t : `Bearer ${t}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { customer, shippingAddress, lineItems, paymentMethod, requiresInstallation, installationNotes, vat, notes } = body;

  if (!lineItems?.length || !customer?.name || !customer?.phone) {
    return NextResponse.json({ message: "Thiếu thông tin đơn hàng" }, { status: 400 });
  }

  const dealerTag = session.shortName;

  const noteLines: string[] = [];
  if (notes) noteLines.push(notes);
  noteLines.push(`[Đại lý: ${dealerTag}]`);
  noteLines.push(`[SĐT KH: ${customer.phone}]`);
  if (customer.email) noteLines.push(`[Email: ${customer.email}]`);
  if (paymentMethod) noteLines.push(`[Thanh toán: ${paymentMethod}]`);
  if (requiresInstallation) {
    noteLines.push(`[Cần lắp đặt${installationNotes ? `: ${installationNotes}` : ""}]`);
  }
  if (vat?.required) {
    noteLines.push(`[VAT: ${vat.companyName || ""} - MST: ${vat.taxCode || ""} - ${vat.address || ""} - ${vat.email || ""}]`);
  }

  const crmLineItems = lineItems.map((item: any) => ({
    productVariantId: item.variantId,
    quantity: item.quantity,
    price: item.dealerPrice,
    priceType: session.priceTier === "agent2" ? "agentPrice2" : "agentPrice1",
  }));

  const crmPayload = {
    sourceName: "web",
    tags: [{ name: dealerTag }],
    note: noteLines.join("\n"),
    lineItems: crmLineItems,
    shippingAddress: shippingAddress
      ? {
          firstName: customer.name,
          phone: customer.phone,
          address1: shippingAddress.address,
          ward: shippingAddress.ward || undefined,
          district: shippingAddress.district || undefined,
          city: shippingAddress.city || undefined,
          country: "Vietnam",
          countryCode: "VN",
        }
      : undefined,
    requiresInstallation: !!requiresInstallation,
    installationNotes: installationNotes || null,
  };

  try {
    const res = await fetch(`${CRM_BASE_URL}/api/admin/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: normalizeAuth(CRM_TOKEN),
      },
      body: JSON.stringify(crmPayload),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("[order-proxy] CRM error:", res.status, errBody);
      return NextResponse.json(
        { message: "Lỗi tạo đơn hàng trên hệ thống" },
        { status: res.status >= 500 ? 502 : res.status },
      );
    }

    const result = await res.json();
    const order = result.data || result;

    return NextResponse.json({
      orderCode: order.code || order.id,
      order: { code: order.code, id: order.id, status: order.status },
    });
  } catch (err: any) {
    console.error("[order-proxy] Error:", err.message);
    return NextResponse.json({ message: "Không thể kết nối hệ thống đặt hàng" }, { status: 502 });
  }
}
