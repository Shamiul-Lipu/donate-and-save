import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/my-profile", "/request-blood"];
const roleBasedPrivateRoutes = {
  // USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/user-management/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname);

  const accessToken = cookies().get("accessToken")?.value;
  // console.log("cookies middleware", accessToken);

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;
  // console.log(role);
  // if (role && roleBasedPrivateRoutes[role as Role]) {
  //   const routes = roleBasedPrivateRoutes[role as Role];
  //   console.log(routes.some((route) => pathname.match(route)));
  //   if (routes.some((route) => pathname.match(route))) {
  //     // routes.some((route) => console.log({ route }));
  //     return NextResponse.next();
  //   }
  // }

  if (pathname === "/dashboard/user-management" && role === "ADMIN") {
    // console.log("ok");
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:page*",
    "/my-profile/:page*",
    "/request-blood",
  ],
};
