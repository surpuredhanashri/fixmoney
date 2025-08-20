# Google OAuth Setup Guide

## Issue
The Google OAuth is not working because the required environment variables are not set.

## Solution

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3002/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret

### 2. Set Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your_random_secret_here
```

### 3. Generate NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

### 4. Restart Development Server

After setting the environment variables, restart your development server:

```bash
npm run dev
```

## Current Status

- ✅ Google OAuth provider configured (when env vars are set)
- ✅ Fallback credentials provider for development
- ✅ Admin access for surpuredhanashri@gmail.com
- ✅ Proper session management
- ✅ Redirect loop prevention

## Testing

1. **With Google OAuth**: Click "Continue with Google" button
2. **Development Mode**: Use the credentials form below the Google button
3. **Admin Access**: Use surpuredhanashri@gmail.com to access admin panel

## Troubleshooting

- Check browser console for error messages
- Verify environment variables are loaded
- Check Google Cloud Console for OAuth configuration
- Ensure redirect URIs match exactly 