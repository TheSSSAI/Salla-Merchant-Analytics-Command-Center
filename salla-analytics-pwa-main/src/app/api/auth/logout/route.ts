import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock service interface
const revokeRefreshToken = async (token: string): Promise<void> => {
  // Logic to remove token from whitelist/database or add to blacklist
  // await db.refreshTokens.delete({ where: { token } });
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    // 1. Server-side Invalidation
    if (refreshToken) {
      // Best effort invalidation. Even if it fails (db down), we should clear client cookies.
      try {
        await revokeRefreshToken(refreshToken);
      } catch (error) {
        console.error('[Auth/Logout] Failed to revoke token:', error);
        // Continue to clear cookies
      }
    }

    // 2. Client-side Cookie Clearing
    // We overwrite them with immediate expiration
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    // 3. Response
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('[Auth/Logout] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}