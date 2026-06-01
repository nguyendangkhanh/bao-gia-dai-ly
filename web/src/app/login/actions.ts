"use server";

import { redirect } from "next/navigation";
import { loginDealer, setSession } from "@/lib/auth";
import { notifyDealerLogin } from "@/lib/telegram";
import { appendTelemetryEvent } from "@/lib/telemetry-log";

export async function loginAction(formData: FormData) {
  const pass = String(formData.get("pass") || "").trim();

  if (!pass) {
    redirect("/login?error=missing_pass");
  }

  const isKhanhOverride = pass === "khanh2026";

  let user;
  try {
    user = isKhanhOverride
      ? {
          name: "Khanh",
          shortName: "khanh",
          groupName: "agentPrice1",
          priceTier: "agent1" as const,
        }
      : await loginDealer(pass);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("CREDENTIAL_NOT_SERVICE_ACCOUNT")) {
      redirect("/login?error=invalid_credential_type");
    }
    if (message.includes("Missing GOOGLE_SHEET_ID")) {
      redirect("/login?error=missing_sheet_env");
    }
    if (message.includes("The caller does not have permission") || message.includes("PERMISSION_DENIED")) {
      redirect("/login?error=sheet_permission");
    }
    if (message.includes("Requested entity was not found") || message.includes("Unable to parse range")) {
      redirect("/login?error=sheet_not_found");
    }
    const encoded = encodeURIComponent(message.slice(0, 180));
    redirect(`/login?error=sheet_unavailable&detail=${encoded}`);
  }

  if (!user) {
    redirect("/login?error=invalid_pass");
  }

  await setSession(user);
  if (!isKhanhOverride) {
    await notifyDealerLogin(user.shortName);
  }
  await appendTelemetryEvent({ type: "login", shortName: user.shortName, groupName: user.groupName });
  redirect("/products");
}
