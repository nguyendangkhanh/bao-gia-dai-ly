import "server-only";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-5061957707";

async function sendTelegramMessage(text: string) {
  if (!TELEGRAM_BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
    }),
    cache: "no-store",
  });
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
