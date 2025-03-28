import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simplemente continua con la petición sin verificar token
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
