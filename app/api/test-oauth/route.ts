import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
  const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002';
  
  // Test Google OAuth configuration
  const oauthTestUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(`${nextAuthUrl}/api/auth/callback/google`)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  
  return NextResponse.json({
    message: 'Google OAuth Test Configuration',
    clientId: clientId ? '✅ Set' : '❌ Missing',
    clientSecret: clientSecret ? '✅ Set' : '❌ Missing',
    nextAuthUrl,
    callbackUrl: `${nextAuthUrl}/api/auth/callback/google`,
    oauthTestUrl,
    instructions: [
      '1. Copy the oauthTestUrl and paste it in a new browser tab',
      '2. This should open Google OAuth consent screen',
      '3. If it shows an error, check your Google Cloud Console configuration',
      '4. Make sure the redirect URI matches exactly',
      '5. Ensure OAuth consent screen is configured'
    ]
  });
} 