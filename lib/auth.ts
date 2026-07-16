import "server-only";
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "admin_session";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "insecure-dev-secret-change-me";
}

// A session token is just an HMAC of a fixed marker with the server secret.
// No DB, no user table — one shared password unlocks everything.
function token(): string {
  return crypto.createHmac("sha256", secret()).update("admin").digest("hex");
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  cookies().set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function destroySession(): Promise<void> {
  cookies().delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return false;
  const expected = token();
  const a = Buffer.from(c);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
