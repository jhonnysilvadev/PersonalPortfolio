import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { accessCookieName, authConfig } from "./lib/auth";

export function proxy(request: NextRequest) {
  const hasAccess = request.cookies.get(accessCookieName)?.value === authConfig.accessToken;

  if (hasAccess) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/manutentionpage", request.url));
}

export const config = {
  matcher: ["/", "/portfolio/:path*"],
};