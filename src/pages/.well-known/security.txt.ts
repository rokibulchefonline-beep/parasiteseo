import { SITE } from '../../config';

// https://securitytxt.org/ — tells researchers how to report a security issue.
export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const body = `Contact: mailto:${SITE.email}\nExpires: ${expires}\nPreferred-Languages: en\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
