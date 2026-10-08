import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.svg
     * - public assets like images, videos, pdfs
     */
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg|assets/).*)',
  ],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip API routes or static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Pure browser detection: Read Accept-Language header sent by the client's browser
  const acceptLanguage = request.headers.get('accept-language') || '';
  let detectedLang = 'en';

  if (acceptLanguage) {
    // Check if any preferred language is French (e.g. "fr-CA", "fr-FR", "fr")
    const languages = acceptLanguage.split(',').map((item) => item.trim().toLowerCase());
    const isFrench = languages.some((l) => l.startsWith('fr'));
    if (isFrench) {
      detectedLang = 'fr';
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-ozuna-lang', detectedLang);

  // Keep cookie in sync with detected browser language
  response.cookies.set('ozuna_preferred_lang', detectedLang, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  });

  return response;
}
