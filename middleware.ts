import { NextResponse, type NextRequest } from "next/server";

// Expose the current pathname to server components (used by the admin layout
// to tell the login page apart from the gated panel pages).
export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*"],
};
