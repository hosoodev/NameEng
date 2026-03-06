import { NextResponse } from 'next/server';

export const runtime = 'edge';

const AD_DESTINATIONS: Record<string, string> = {
    'internet': 'https://ad.cpaad.co.kr/baron01/yosemite2026',
    'internet-kt': 'https://ad.cpaad.co.kr/baron01/yosemite2026?carrier=kt',
    'internet-skb': 'https://ad.cpaad.co.kr/baron01/yosemite2026?carrier=skb',
    'internet-lg': 'https://ad.cpaad.co.kr/baron01/yosemite2026?carrier=lg',
};

const ALLOWED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ ad: string }> }
) {
    const { ad } = await params;
    const adKey = ad?.toLowerCase();
    const destination = AD_DESTINATIONS[adKey];

    if (!destination) {
        return NextResponse.redirect(new URL('/', request.url), 302);
    }

    const requestUrl = new URL(request.url);
    const destinationUrl = new URL(destination);

    requestUrl.searchParams.forEach((value, key) => {
        if (ALLOWED_PARAMS.includes(key) && !destinationUrl.searchParams.has(key)) {
            destinationUrl.searchParams.append(key, value);
        }
    });

    const response = NextResponse.redirect(destinationUrl.toString(), 307);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');

    return response;
}