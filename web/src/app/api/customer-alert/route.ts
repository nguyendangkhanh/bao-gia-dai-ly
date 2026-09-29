import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { notifyCustomerAlert } from "@/lib/telegram";
import { MANSON_SHOWROOMS, CustomerAlertPayload } from "@/types/customer-alert";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." },
      { status: 401 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 }
    );
  }

  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    return NextResponse.json(
      { ok: false, error: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 }
    );
  }

  const body = rawBody as Partial<CustomerAlertPayload>;

  const showroomTitle = String(body.showroomTitle || "").trim();
  const productName = String(body.productName || "").trim();
  const customerName = String(body.customerName || "").trim();
  const customerPhone = String(body.customerPhone || "").trim();
  const expectedTime = String(body.expectedTime || "").trim();
  const note = String(body.note || "").trim();

  // Validate required fields
  if (!showroomTitle) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng chọn chi nhánh showroom Manson." },
      { status: 400 }
    );
  }

  const matchedShowroom = MANSON_SHOWROOMS.find(
    (s) => s.title.toLowerCase() === showroomTitle.toLowerCase() || s.id === showroomTitle
  );

  if (!matchedShowroom) {
    return NextResponse.json(
      { ok: false, error: "Chi nhánh showroom không hợp lệ." },
      { status: 400 }
    );
  }

  if (!productName || productName.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng nhập sản phẩm khách xem." },
      { status: 400 }
    );
  }

  const finalShowroomTitle = matchedShowroom.title;

  const success = await notifyCustomerAlert({
    showroomTitle: finalShowroomTitle,
    productName,
    customerName: customerName || undefined,
    customerPhone: customerPhone || undefined,
    expectedTime: expectedTime || undefined,
    note: note || undefined,
    dealerName: session.shortName || session.name,
  });

  if (!success) {
    return NextResponse.json(
      { ok: false, error: "Không thể gửi tin nhắn Telegram tới nhóm hỗ trợ. Vui lòng thử lại." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Đã gửi thông tin báo khách tới showroom thành công.",
  });
}
