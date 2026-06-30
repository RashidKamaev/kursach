import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
const key = new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me-32chars");
export type Session = { userId: string; role: "CLIENT" | "MASTER" | "SALON_OWNER" | "ADMIN"; email: string };
export async function createToken(data: Session) {
  return new SignJWT(data).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key);
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("cosmetos_session")?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, key)).payload as unknown as Session; } catch { return null; }
}
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return db.user.findUnique({ where: { id: session.userId }, include: { profile: true } });
}
