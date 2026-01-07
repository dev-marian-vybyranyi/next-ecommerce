import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check for session cart cookie
  if (!req.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // Clone the req headers
    const newRequestHeaders = new Headers(req.headers);

    // Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Set newly generated sessionCartId in the response cookies
    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
