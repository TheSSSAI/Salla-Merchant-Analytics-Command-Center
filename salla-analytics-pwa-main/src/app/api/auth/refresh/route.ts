import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock service
const refreshSession = async (refreshToken: string) => {
  // Logic: Verify DB, check expiry, rotate token
  if (refreshToken === 'invalid') throw new Error('Invalid token');
  return {
    accessToken: 'new_jwt_access_token',
    refreshToken: 'new_rotated_refresh_token',
    expiresIn: 900
  };
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const currentRefreshToken = cookieStore.get('refresh_token')?.value;

    if (!currentRefreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // 1. Attempt Refresh
    let newTokens;
    try {
      newTokens = await refreshSession(currentRefreshToken);
    } catch (error) {
      // If refresh fails (expired, revoked), clear cookies and force login
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      return NextResponse.json(
        { error: 'Session expired', code: 'TOKEN_EXPIRED' },
        { status: 401 }
      );
    }

    // 2. Set Rotated Tokens
    cookieStore.set('access_token', newTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: newTokens.expiresIn
    });

    cookieStore.set('refresh_token', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 
    });

    return NextResponse.json({
      message: 'Token refreshed successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('[Auth/Refresh] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}