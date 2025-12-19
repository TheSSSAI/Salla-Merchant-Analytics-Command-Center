import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

// Assuming internal service architecture for clean separation
// In a real repo, these would be imported from @/lib/services/auth
// Mocking the interface for compilation safety within this file context
interface AuthResult {
  user: { id: string; email: string; role: string; name: string };
  tokens: { accessToken: string; refreshToken: string; expiresIn: number };
}

// Simulating a service call - normally imported
const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  // This would be a real database/service call
  // For generation purposes, we assume this service exists and handles the logic
  // including password hashing comparison.
  // Throwing error if failed to simulate service behavior
  if (email === 'fail@test.com') throw new Error('Invalid credentials');
  
  return {
    user: { id: 'usr_123', email, role: 'Owner', name: 'Merchant User' },
    tokens: { 
      accessToken: 'jwt_access_token_example', 
      refreshToken: 'jwt_refresh_token_example',
      expiresIn: 900 // 15 minutes
    }
  };
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 1. Input Validation
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation Failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. Authenticate User via Service
    // In a real scenario, this catches specific auth errors (UserNotFound, InvalidPassword)
    // and returns a generic "Invalid credentials" to prevent enumeration.
    let authResult: AuthResult;
    try {
      authResult = await loginUser(email, password);
    } catch (error) {
      // Security: Generic error message to prevent account enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 3. Secure Session Management (HttpOnly Cookies)
    const cookieStore = cookies();
    
    // Access Token - Short lived
    cookieStore.set('access_token', authResult.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: authResult.tokens.expiresIn
    });

    // Refresh Token - Long lived (e.g., 30 days)
    cookieStore.set('refresh_token', authResult.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 
    });

    // 4. Return User Data (Sanitized)
    return NextResponse.json({
      user: authResult.user,
      message: 'Login successful'
    }, { status: 200 });

  } catch (error) {
    console.error('[Auth/Login] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}