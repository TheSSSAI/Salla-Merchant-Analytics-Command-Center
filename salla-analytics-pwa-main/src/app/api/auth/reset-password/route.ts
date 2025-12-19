import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Mock service
const resetUserPassword = async (token: string, newPassword: string): Promise<void> => {
  // Logic: Look up user by reset token, verify expiry, hash new password, save, invalidate token
  // if (tokenExpired) throw new Error('Token expired');
};

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(10, 'Password must be at least 10 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validation
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation Failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // 2. Perform Reset
    try {
      await resetUserPassword(token, password);
    } catch (error) {
      // In a security context, we might want to be vague, but for reset tokens, 
      // it's helpful to know if the link expired.
      // Assuming the service throws safe errors for this context.
      return NextResponse.json(
        { error: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    // 3. Success
    return NextResponse.json({
      message: 'Password has been successfully reset'
    }, { status: 200 });

  } catch (error) {
    console.error('[Auth/ResetPassword] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}