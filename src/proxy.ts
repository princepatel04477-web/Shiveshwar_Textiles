import { NextResponse, type NextRequest } from 'next/server';

const CANONICAL_HOST = 'shiveshwartextiles.com';

// Send www and plain-http visitors to https://shiveshwartextiles.com (one canonical URL for SEO).
// Other hosts (workers.dev, localhost) pass through untouched.
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = (request.headers.get('host') ?? url.host).toLowerCase();
  const isOurDomain = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;

  if (isOurDomain && (host !== CANONICAL_HOST || url.protocol === 'http:')) {
    return NextResponse.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
