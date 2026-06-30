import { NextRequest, NextResponse } from "next/server";
const roleRoots: Record<string, string> = { client: "CLIENT", master: "MASTER", salon: "SALON_OWNER", admin: "ADMIN" };
export function middleware(req: NextRequest) {
  const section = req.nextUrl.pathname.split("/")[2];
  const expected = roleRoots[section];
  if (!expected) return NextResponse.next();
  const token = req.cookies.get("cosmetos_session");
  if (!token) return NextResponse.redirect(new URL("/?auth=login", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*"] };
