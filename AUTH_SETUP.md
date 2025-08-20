# Google OAuth Authentication Setup

This guide will help you set up Google OAuth authentication for FixMoney.in.

## Prerequisites

- Google Cloud Console account
- Next.js project with the required dependencies

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add the following authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://fixmoney.in/api/auth/callback/google` (for production)
8. Note down your Client ID and Client Secret

## Step 2: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

**Important:** Replace the placeholder values with your actual Google OAuth credentials.

## Step 3: Generate NextAuth Secret

Generate a secure random string for NEXTAUTH_SECRET:

```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using node
node -e "console.log(require('crypto').randomBytes(32).toString('hex')"
```

## Step 4: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/auth/signin` to test the sign-in page
3. Click "Continue with Google" to test the OAuth flow
4. After successful authentication:
   - If email is `surpuredhanashri@gmail.com` → redirects to `/admin`
   - If any other email → redirects to `/profile`

## Step 5: Production Deployment

1. Update your production environment variables with the production Google OAuth credentials
2. Update `NEXTAUTH_URL` to your production domain
3. Ensure your production domain is added to the authorized redirect URIs in Google Cloud Console

## Features

### Authentication Flow
- **Sign In**: Users can sign in with Google OAuth
- **Role-based Access**: 
  - Admin users (`surpuredhanashri@gmail.com`) get access to `/admin`
  - Regular users get access to `/profile`
- **Protected Routes**: Admin and profile pages are protected and require authentication

### Navigation Updates
- **Blogs**: Added to top navigation bar
- **Admin**: Only visible to admin users
- **Login Button**: Right-aligned sign-in button for unauthenticated users
- **User Menu**: Profile/Admin link and sign-out button for authenticated users

### Pages
- `/auth/signin` - Google OAuth sign-in page
- `/profile` - User profile page for regular users
- `/admin` - Admin panel (admin users only)
- `/blogs` - Blog listing page

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Ensure your redirect URIs in Google Cloud Console match exactly
   - Check for trailing slashes or protocol mismatches

2. **"OAuth client not found" error**
   - Verify your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   - Ensure the credentials are for a web application, not mobile

3. **Session not persisting**
   - Check your NEXTAUTH_SECRET is set
   - Verify NEXTAUTH_URL matches your domain

4. **Admin access not working**
   - Ensure the user's email exactly matches `surpuredhanashri@gmail.com`
   - Check browser console for any JavaScript errors

### Debug Mode

To enable debug mode, add this to your `.env.local`:

```bash
NEXTAUTH_DEBUG=true
```

This will provide detailed logging in the console for troubleshooting authentication issues.

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique secrets for NEXTAUTH_SECRET
- Regularly rotate your Google OAuth credentials
- Monitor your Google Cloud Console for any suspicious activity
- Consider implementing additional security measures like rate limiting for production use

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Google OAuth credentials are properly configured
4. Check NextAuth.js documentation for additional troubleshooting steps 