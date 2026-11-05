import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/proxy";

// Next.js 16 calls middleware "Proxy"; do not add a second middleware.ts.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4)$).*)"],
};
