"use client";

import { useFormStatus } from "react-dom";

export default function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-gradient-to-r from-[#ff6b1a] to-[#f97316] px-4 py-3 text-base font-bold text-white shadow-lg shadow-orange-200 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Đang đăng nhập..." : "Đăng nhập"}
    </button>
  );
}
