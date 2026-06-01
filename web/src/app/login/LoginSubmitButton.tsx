"use client";

import { useFormStatus } from "react-dom";

export default function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="tm-cta w-full disabled:cursor-not-allowed disabled:opacity-70">
      {pending ? "Đang đăng nhập..." : "Đăng nhập"}
    </button>
  );
}
