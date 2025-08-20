import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Debug: Check if environment variables are loaded
const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002';

console.log('NextAuth Config - Environment Check:');
console.log('GOOGLE_CLIENT_ID:', clientId ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', clientSecret ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_URL:', nextAuthUrl);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing');
console.log('Google OAuth Callback URL:', `${nextAuthUrl}/api/auth/callback/google`);
console.log('Google OAuth Callback URL (exact):', `${nextAuthUrl}/api/auth/callback/google`);
console.log('Current server URL:', process.env.VERCEL_URL || 'localhost:3002');
console.log('Expected Google OAuth redirect URI:', `${nextAuthUrl}/api/auth/callback/google`);
console.log('Make sure this exact URL is added to Google Cloud Console OAuth 2.0 Client IDs');

if (!clientId || !clientSecret) {
  console.error('❌ CRITICAL: Google OAuth credentials are missing!');
  console.error('Please check your .env.local file');
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId!,
      clientSecret: clientSecret!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      console.log('JWT callback triggered:', { hasToken: !!token, hasUser: !!user, hasAccount: !!account });
      if (account && user) {
        // Initial sign in
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        console.log('JWT token updated with user data');
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log('Session callback triggered:', { hasSession: !!session, hasToken: !!token });
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        // Add access token to session for debugging
        (session as any).accessToken = token.accessToken;
        console.log('Session updated with user data');
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      console.log('Redirect callback triggered:', { url, baseUrl });
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile }: any) {
      // Log sign-in attempt for debugging
      console.log('Sign-in callback triggered:', { 
        email: user.email, 
        name: user.name, 
        provider: account?.provider,
        accountType: account?.type
      });
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: true, // Temporarily enable debug
};

// Log the final configuration
console.log('NextAuth - Final configuration:');
console.log('- Providers:', authOptions.providers.map(p => ({ id: p.id, name: p.name })));
console.log('- Session strategy:', authOptions.session?.strategy);
console.log('- Debug mode:', authOptions.debug);
console.log('- Custom pages:', authOptions.pages);

const handler = NextAuth(authOptions);

// Debug: Log available providers
console.log('NextAuth - Available providers:', authOptions.providers.map(p => p.id));

export { handler as GET, handler as POST }; 