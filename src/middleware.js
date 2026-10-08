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

/**
 * Parses the HTTP Accept-Language header honoring standard RFC 4647 quality weights (q-values).
 * Example: "en-US,en;q=0.9,fr;q=0.8" -> primary preference is English.
 */
function getPreferredLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return 'en';

  const preferences = acceptLanguageHeader
    .split(',')
    .map((item) => {
      const parts = item.trim().split(';');
      const code = parts[0].trim().toLowerCase();
      let q = 1.0;
      if (parts[1]) {
        const qMatch = parts[1].trim().match(/^q=([0-9.]+)/);
        if (qMatch) {
          q = parseFloat(qMatch[1]);
        }
      }
      return { code, q };
    })
    .sort((a, b) => b.q - a.q); // Highest quality weight first

  for (const pref of preferences) {
    if (pref.code.startsWith('fr')) {
      return 'fr';
    }
    if (pref.code.startsWith('en')) {
      return 'en';
    }
  }

  return 'en';
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const detectedLang = getPreferredLanguage(acceptLanguage);

  const response = NextResponse.next();
  response.headers.set('x-ozuna-lang', detectedLang);

  return response;
}
