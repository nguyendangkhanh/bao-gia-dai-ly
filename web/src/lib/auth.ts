import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getAllDealers } from "@/lib/google-sheet";

export type SessionUser = {
  name: string;
  shortName:string;
  groupName: string;
  priceTier: "agent1" | "agent2";
};

const COOKIE_NAME = "dealer_session";
const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-secret-change-me");

function normalizePassword(value: string) {
  return value
    .replace(/[​-‍﻿]/g, "")
    .trim();
}

export async function loginDealer(pass: string): Promise<SessionUser | null> {
  const dealers = await getAllDealers();
  const input = normalizePassword(pass);
  const found = dealers.find((d) => normalizePassword(d.pass) === input);
  if (!found) return null;
  return { name: found.name, shortName:found.shortName, groupName: found.groupName, priceTier: found.priceTier };
}

export async function setSession(user: SessionUser) {
  const token = await new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("12h").sign(SECRET);
  const store = await cookies();
  store.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: false, path: "/" });
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      name: String(payload.name || ""),
      shortName: String(payload.shortName || ""),
      groupName: String(payload.groupName || ""),
      priceTier: payload.priceTier === "agent2" ? "agent2" : "agent1",
    };
  } catch {
    return null;
  }
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
