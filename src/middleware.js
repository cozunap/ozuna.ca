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

  // 1. Check if user already has an explicit preference in cookies
  const cookieLang = request.cookies.get('ozuna_preferred_lang')?.value;

  let detectedLang = 'en';

  if (cookieLang === 'fr' || cookieLang === 'en') {
    detectedLang = cookieLang;
  } else {
    // 2. Read Accept-Language header from browser
    const acceptLanguage = request.headers.get('accept-language') || '';
    // E.g. "fr-CA,fr;q=0.9,en-US;q=0.8,en;q=0.7"
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0].trim().toLowerCase();
      if (preferred.startsWith('fr')) {
        detectedLang = 'fr';
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-ozuna-lang', detectedLang);

  // If cookie is not set yet, set it so client and server remain synchronized
  if (!cookieLang) {
    response.cookies.set('ozuna_preferred_lang', detectedLang, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }

  return response;
}
