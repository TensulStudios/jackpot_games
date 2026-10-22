export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter', { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);
    
    // Basic safety check to prevent internal/local network requests (SSRF protection)
    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname) || parsed.protocol !== 'https:') {
      return new Response('Invalid or disallowed URL', { status: 400 });
    }

    // Fetch the target website server-side
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const body = await response.arrayBuffer();
    const headers = new Headers(response.headers);

    // Strip headers that prevent iframing
    headers.delete('x-frame-options');
    headers.delete('content-security-policy');
    headers.delete('content-security-policy-report-only');

    return new Response(body, {
      status: response.status,
      headers,
    });
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 500 });
  }
}
