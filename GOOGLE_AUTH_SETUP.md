# Google Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your T-Race application.

## Prerequisites

1. A Google Cloud Platform account
2. A Google Cloud Project

## Step 1: Create Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "T-Race App")
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and then "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in the required fields:
     - App name: "T-Race"
     - User support email: Your email
     - Developer contact information: Your email
   - Add scopes: `../auth/userinfo.email` and `../auth/userinfo.profile`
   - Add test users (your email for testing)
4. For Application type, choose "Web application"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Click "Create"
7. Copy the Client ID and Client Secret

## Step 4: Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

3. Replace the placeholder values with your actual credentials
4. For `NEXTAUTH_SECRET`, you can generate a random string or use:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Get Started" or "Start Racing"
4. You should be redirected to Google's OAuth consent screen
5. After authentication, you'll be redirected back to your app

## Production Deployment

For production deployment:

1. Update your Google OAuth credentials with your production domain
2. Set `NEXTAUTH_URL` to your production URL
3. Ensure all environment variables are set in your hosting platform

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**: Make sure your redirect URI in Google Console matches exactly with your app's callback URL
2. **"invalid_client" error**: Check that your Client ID and Client Secret are correct
3. **"access_denied" error**: Make sure you've added your email as a test user in the OAuth consent screen

### Debug Mode:

Add this to your `.env.local` for more detailed error messages:
```env
NEXTAUTH_DEBUG=true
```

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables in production
- Regularly rotate your OAuth credentials
- Keep your `NEXTAUTH_SECRET` secure and random
