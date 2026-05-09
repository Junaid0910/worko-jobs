import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin pages
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Worker dashboard
    if (path.startsWith("/dashboard/worker") && token?.role !== "WORKER") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Hirer dashboard
    if (path.startsWith("/dashboard/hirer") && token?.role !== "HIRER") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/post-job",
    "/onboarding",
  ],
};
