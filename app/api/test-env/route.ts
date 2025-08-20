import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Environment Variables Test',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing',
    nextAuthUrl: process.env.NEXTAUTH_URL || '❌ Missing',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
    nodeEnv: process.env.NODE_ENV,
    allEnvVars: Object.keys(process.env).filter(key => 
      key.includes('GOOGLE') || key.includes('NEXTAUTH')
    ).reduce((acc, key) => {
      acc[key] = process.env[key] ? 'Set' : 'Missing';
      return acc;
    }, {} as Record<string, string>)
  });
} 