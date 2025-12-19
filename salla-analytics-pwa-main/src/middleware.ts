import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Configuration for the middleware matcher.
 * Excludes static files, images, and internal Next.js paths.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};

/**
 * Public routes that do not require authentication.
 */
const PUBLIC_ROUTES = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/callback', // OAuth callback
  '/api/auth/reset-password',
  '/api/auth/forgot-password',
  '/', // Landing page might be public
]);

/**
 * Routes related to authentication state (Login/Register).
 * Authenticated users should be redirected away from these to the dashboard.
 */
const AUTH_ROUTES = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
]);

/**
 * Name of the session cookie used for authentication.
 * Must match the cookie set by the Auth Service (Sequence 424).
 */
const SESSION_COOKIE_NAME = 'salla_auth_token'; // Can be pulled from env, hardcoded for explicit logic here

/**
 * Enterprise Middleware for Route Protection and Redirection.
 * Implements the Gateway pattern for the BFF.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Check if the user has a session token
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);
  
  // 2. Determine route type
  const isPublicRoute = PUBLIC_ROUTES.has(pathname) || pathname.startsWith('/api/public');
  const isAuthRoute = AUTH_ROUTES.has(pathname);
  const isApiRoute = pathname.startsWith('/api');

  // 3. Scenario: User is NOT Authenticated
  if (!hasSession) {
    // If trying to access a protected page, redirect to login
    if (!isPublicRoute) {
      // If it's an API call, return 401 JSON response instead of redirecting HTML
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        );
      }

      // Create redirect URL with returnTo parameter for UX
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  // 4. Scenario: User IS Authenticated
  if (hasSession) {
    // If trying to access Login/Register pages, redirect to Dashboard (US-004 AC-006)
    if (isAuthRoute) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Role-Based Access Control (RBAC) Placeholder
    // In a full implementation, we might decode the JWT here (if not opaque) to check roles.
    // However, for security, detailed RBAC is often enforced at the Layout or Page level 
    // calling the backend, or by the backend API itself. 
    // This middleware primarily enforces Authentication status.
  }

  // 5. Allow request to proceed
  const response = NextResponse.next();

  // Security Headers Injection (OWASP Recommendations)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  return response;
}