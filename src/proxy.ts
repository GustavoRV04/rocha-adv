import { NextResponse, type NextRequest } from "next/server";
import { adminSessionCookie, verifySessionToken } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const session = verifySessionToken(
    request.cookies.get(adminSessionCookie)?.value,
  );
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/login";

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
