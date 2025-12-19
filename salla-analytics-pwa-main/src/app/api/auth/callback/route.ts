import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

// This handler receives the callback from Salla OAuth2 flow
// URL: /api/auth/callback?code=...&state=...

// Mock service for Salla OAuth exchange
const exchangeSallaCode = async (code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: any;
}> => {
  // Call Salla API or Internal AuthService wrapper
  // POST https://accounts.salla.sa/oauth2/token
  return {
    accessToken: 'salla_access_token',
    refreshToken: 'salla_refresh_token',
    expiresIn: 3600,
    user: { id: 'salla_usr_1', email: 'merchant@salla.sa' }
  };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // 1. Handle Salla Errors (Access Denied, etc.)
    if (error) {
      console.warn(`[Auth/Callback] OAuth Error: ${error}`);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Access denied by Salla')}`, request.url)
      );
    }

    // 2. Validation
    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/login?error=invalid_callback_params', request.url)
      );
    }

    // 3. CSRF Protection (State Validation)
    const cookieStore = cookies();
    const savedState = cookieStore.get('oauth_state')?.value;

    if (!savedState || savedState !== state) {
      console.error('[Auth/Callback] State mismatch (CSRF Attempt)');
      return NextResponse.redirect(
        new URL('/login?error=security_validation_failed', request.url)
      );
    }

    // Clean up state cookie
    cookieStore.delete('oauth_state');

    // 4. Token Exchange
    const sallaAuth = await exchangeSallaCode(code);

    // 5. Establish App Session
    // Here we map Salla identity to our App identity and issue OUR JWTs
    // For simplicity in this artifact, we assume a 1:1 mapping logic happened in exchangeSallaCode 
    // and we generate OUR tokens.
    
    // In a real app: const appTokens = await AuthService.createSessionFromSallaIdentity(sallaAuth);
    const appTokens = {
        accessToken: 'app_jwt_access',
        refreshToken: 'app_jwt_refresh'
    };

    // Set Session Cookies
    cookieStore.set('access_token', appTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 900 // 15 mins
    });

    cookieStore.set('refresh_token', appTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    // 6. Redirect to Onboarding or Dashboard
    // Determine where to send the user based on onboarding status (mocked here)
    const isOnboardingComplete = false; 
    const redirectPath = isOnboardingComplete ? '/dashboard' : '/onboarding/sync';

    return NextResponse.redirect(new URL(redirectPath, request.url));

  } catch (error) {
    console.error('[Auth/Callback] Exchange failed:', error);
    return NextResponse.redirect(
      new URL('/login?error=auth_exchange_failed', request.url)
    );
  }
}