import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** On unless explicitly set to "false" (see backup/SITE-MAINTENANCE-README.md). */
const MAINTENANCE_ENABLED = process.env.SITE_MAINTENANCE_MODE !== "false";

function isStaticAsset(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/images")) return true;
  if (pathname === "/healthz") return true;
  if (/\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|woff2?|txt|xml)$/i.test(pathname)) {
    return true;
  }
  return false;
}

function maintenanceResponse(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  const response = NextResponse.rewrite(url);
  response.headers.set("x-maintenance", "1");
  return response;
}

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json({ error: "Site under maintenance" }, { status: 503 });
  }

  if (pathname === "/maintenance") {
    const response = NextResponse.next();
    response.headers.set("x-maintenance", "1");
    return response;
  }

  return maintenanceResponse(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
