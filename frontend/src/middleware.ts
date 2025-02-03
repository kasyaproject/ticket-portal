import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  // ambil token dari header
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  // ambil niali url
  const { pathname } = request.nextUrl;

  // jika url di "login"/"regiter" dan jika ada token(sudah login) ada maka redirect ke home untuk menghindari /login dan /register
  if (pathname == "/auth/login" || pathname == "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // middleware untuk /admin
  if (pathname.startsWith("/admin")) {
    // Jika belum login maka tidak bisa akses "/admin/...."
    if (!token) {
      const url = new URL("/auth/login", request.url);

      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    // jika role bukan admin
    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }

    // untuk mengarahkan ke dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // middleware untuk /member
  if (pathname.startsWith("/member")) {
    // Jika belum login maka tidak bisa akses "/member/...."
    if (!token) {
      const url = new URL("/auth/login", request.url);

      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    // jika role bukan admin
    if (token?.user?.role !== "user") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // untuk mengarahkan ke dashboard
    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
