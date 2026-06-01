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
  const error = params.error ? ERROR_MESSAGE[params.error] : "";
  const detail = params.detail ? decodeURIComponent(params.detail) : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center p-4 md:p-6 fade-in">
      <div className="w-full max-w-md space-y-4">
        <section className="rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#f97316] to-[#e63946] p-5 text-white shadow-xl">
          <h1 className="text-2xl font-bold">Đăng nhập đại lý</h1>
          <p className="mt-1 text-sm text-white/90">The Manson Dealer Pricing Portal</p>
        </section>

        <form action={loginAction} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-lg space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <div>{error}</div>
              {detail && <div className="mt-1 break-all text-xs text-red-600">Chi tiết: {detail}</div>}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Mật khẩu</label>
            <input name="pass" type="password" className="tm-input" placeholder="Nhập mật khẩu đại lý" />
          </div>

          <LoginSubmitButton />
        </form>
      </div>
    </main>
  );
}
