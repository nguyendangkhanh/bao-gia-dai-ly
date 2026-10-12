"use client";

import { useState } from "react";
import type { DealerApiKeyStatus } from "@/lib/dealer-api-keys";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("vi-VN");
}

export default function ApiKeyManager({ initialStatus }: { initialStatus: DealerApiKeyStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(false);

  const issueKey = async () => {
    setIsLoading(true);
    setError("");
    setCopied(false);
    try {
      const res = await fetch("/api/dealer/api-key", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Không tạo được key");
      setNewKey(data.apiKey);
      setStatus({ hasKey: true, apiKeySuffix: data.apiKey.slice(-6), createdAt: data.createdAt, lastUsedAt: null });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const revokeKey = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dealer/api-key", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thu hồi được key");
      setStatus({ hasKey: false, apiKeySuffix: null, createdAt: null, lastUsedAt: null });
      setNewKey(null);
      setConfirmRevoke(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const copyKey = async () => {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard không khả dụng (vd http không secure context) — đại lý tự copy tay */
    }
  };

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-md space-y-5">
      <h2 className="text-lg font-bold text-orange-800 flex items-center gap-2">🔑 API Key của bạn</h2>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</div>
      )}

      {newKey && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-2">
          <p className="text-sm font-bold text-green-800">✅ Đã tạo key mới — lưu lại ngay, sẽ KHÔNG hiển thị lại:</p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="flex-1 min-w-0 break-all rounded-lg bg-white border border-green-200 px-3 py-2 text-sm font-mono text-zinc-800">
              {newKey}
            </code>
            <button
              onClick={copyKey}
              className="rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 shrink-0"
            >
              {copied ? "Đã copy ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-zinc-50 border border-zinc-200/70 p-4 text-sm space-y-1.5">
        {status.hasKey ? (
          <>
            <p className="font-semibold text-zinc-800">
              Trạng thái: <span className="text-green-700">Đang hoạt động</span>
            </p>
            <p className="text-zinc-600">Key kết thúc bằng: <code className="font-mono">...{status.apiKeySuffix}</code></p>
            <p className="text-zinc-600">Tạo lúc: {formatDate(status.createdAt)}</p>
            <p className="text-zinc-600">Dùng lần cuối: {formatDate(status.lastUsedAt)}</p>
          </>
        ) : (
          <p className="font-semibold text-zinc-600">Bạn chưa có API key nào đang hoạt động.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={issueKey}
          disabled={isLoading}
          className="rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-sm px-4 py-2.5"
        >
          {status.hasKey ? "Tạo key mới (hủy key cũ)" : "Tạo key mới"}
        </button>

        {status.hasKey && !confirmRevoke && (
          <button
            onClick={() => setConfirmRevoke(true)}
            disabled={isLoading}
            className="rounded-xl border border-red-300 text-red-700 hover:bg-red-50 font-bold text-sm px-4 py-2.5"
          >
            Thu hồi key
          </button>
        )}

        {confirmRevoke && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
            <span className="text-sm font-semibold text-red-700">Chắc chắn thu hồi? Website đang dùng key này sẽ ngừng hoạt động ngay.</span>
            <button onClick={revokeKey} disabled={isLoading} className="rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5">
              Xác nhận
            </button>
            <button onClick={() => setConfirmRevoke(false)} className="rounded-lg border border-zinc-300 text-xs font-semibold px-3 py-1.5">
              Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
