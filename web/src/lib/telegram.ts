import "server-only";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-5061957707";
const TELEGRAM_CUSTOMER_ALERT_CHAT_ID = process.env.TELEGRAM_CUSTOMER_ALERT_CHAT_ID || "-5290572248";

async function sendTelegramMessage(text: string, chatId: string = TELEGRAM_CHAT_ID): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error("[Telegram] TELEGRAM_BOT_TOKEN is not configured. Message cannot be sent.");
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; description?: string } | null;

    if (!res.ok || !data?.ok) {
      console.error(`[Telegram] Send error status ${res.status}:`, data?.description || "Unknown error");
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Telegram] Network error sending message:", error);
    return false;
  }
}

export async function notifyDealerLogin(shortName: string) {
  const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  await sendTelegramMessage(`${shortName} đã truy cập vào lúc: ${time}`);
}

export async function notifyDealerViewProduct(shortName: string, productName: string) {
  if (shortName === "Khanh") return;

  await sendTelegramMessage(`${shortName} đang xem sản phẩm: ${productName}`);
}

export async function notifyRawTelegram(text: string) {
  await sendTelegramMessage(text);
}

export interface CustomerAlertNotificationParams {
  showroomTitle: string;
  showroomAddress?: string;
  productName: string;
  quotedPrice: string;
  customerName?: string;
  customerPhone?: string;
  expectedTime?: string;
  note?: string;
  dealerName: string;
  dealerGroup?: string;
}

export async function notifyCustomerAlert(params: CustomerAlertNotificationParams): Promise<boolean> {
  const {
    showroomTitle,
    showroomAddress,
    productName,
    quotedPrice,
    customerName,
    customerPhone,
    expectedTime,
    note,
    dealerName,
    dealerGroup,
  } = params;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  const customerInfo = [customerName?.trim(), customerPhone?.trim()].filter(Boolean).join(" - ") || "Chưa cung cấp";
  const showroomInfo = showroomAddress ? `${showroomTitle} (${showroomAddress})` : showroomTitle;
  const dealerInfo = dealerGroup ? `${dealerName} (${dealerGroup})` : dealerName;

  const lines = [
    "🚨 CÓ KHÁCH TỚI SHOWROOM 🚨",
    `Có khách tới showroom, tới xem sản phẩm: ${productName.trim()}, báo giá: ${quotedPrice.trim()} tại chi nhánh: ${showroomTitle}`,
    "━━━━━━━━━━━━━━━━━━━━",
    `🏢 Chi nhánh: ${showroomInfo}`,
    `🛋 Sản phẩm: ${productName.trim()}`,
    `💵 Báo giá: ${quotedPrice.trim()}`,
    `👤 Khách hàng: ${customerInfo}`,
  ];

  if (expectedTime?.trim()) {
    lines.push(`⏰ Thời gian dự kiến: ${expectedTime.trim()}`);
  }
  if (note?.trim()) {
    lines.push(`📝 Ghi chú: ${note.trim()}`);
  }

  lines.push(
    "━━━━━━━━━━━━━━━━━━━━",
    `🤝 Đại lý báo: ${dealerInfo}`,
    `⏱ Thời gian gửi: ${timeStr} - ${dateStr}`
  );

  const message = lines.join("\n");
  return sendTelegramMessage(message, TELEGRAM_CUSTOMER_ALERT_CHAT_ID);
}
