import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  // ambil token
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // auth/login & auth/register
  if (pathname == "/auth/login" || pathname == "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    console.log("Role:", token?.user?.role);

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/member/transaction", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/event", request.url));
    }
  }

  // member
  if (pathname.startsWith("/member")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "member") {
      return NextResponse.redirect(new URL("/admin/event", request.url));
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/transaction", request.url));
    }
  }
}
