import { NextResponse } from 'next/server';

// Temporarily disabled middleware to fix redirect loops
export default function middleware(req) {
  // Allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [], // No routes matched
}; 