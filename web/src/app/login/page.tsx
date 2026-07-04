import Image from "next/image";

export const maxDuration = 60;

import { loginAction } from "./actions";
import LoginSubmitButton from "./LoginSubmitButton";

const ERROR_MESSAGE: Record<string, string> = {
  missing_pass: "Vui lòng nhập mật khẩu.",
  invalid_pass: "Mật khẩu không đúng.",
  missing_sheet_env: "Thiếu GOOGLE_SHEET_ID_agentPrice1/2 trong file .env.",
  invalid_credential_type: "client_secret.json hiện không phải Service Account JSON nên không thể đọc Sheet server-to-server.",
  sheet_permission: "Service account chưa được share quyền xem Google Sheet.",
  sheet_not_found: "Không tìm thấy Google Sheet hoặc range không hợp lệ.",
  sheet_unavailable: "Không đọc được dữ liệu đại lý từ Google Sheet. Kiểm tra lại credentials và quyền truy cập.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string }>;
}) {
  const params = await searchParams;
  const error = params.error ? ERROR_MESSAGE[params.error as string] : "";
  const detail = params.detail ? (typeof params.detail === 'string' ? params.detail : params.detail[0]) : "";

  return (
    <main className="min-h-screen bg-[#f7f7f5] fade-in">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-6 lg:py-8">
        <section className="relative overflow-hidden rounded-[32px] bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-4 lg:p-5">
          <Image
            src="/banner-dai-ly.png"
            alt="Manson Dealer Program"
            width={1080}
            height={1080}
            className="h-auto w-full rounded-[26px] object-cover"
            priority
          />
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_20px_60px_rgba(249,115,22,0.12)] sm:p-7">
            <div className="mb-6 text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ff6b1a]">Dealer Portal</div>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">Đăng nhập đại lý</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Nhập mật khẩu để truy cập hệ thống báo giá
              </p>
            </div>

            <form action={loginAction} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <div>{error}</div>
                  {detail && <div className="mt-1 break-all text-xs text-red-600">Chi tiết: {detail}</div>}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700">Mật khẩu</label>
                <input
                  name="pass"
                  type="password"
                  className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 px-4 py-3 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  placeholder="Nhập mật khẩu đại lý"
                />
              </div>

              <LoginSubmitButton />
            </form>

           
          </div>
        </section>
      </div>
    </main>
  );
}
