import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Temporarily disabled middleware to fix redirect loops
export default function middleware(req: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [], // No routes matched
};
