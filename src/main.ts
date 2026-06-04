import { waitUntil } from 'cloudflare:workers';

const IMAGE_PREFIX = '/images/';

export default {
  async fetch(request, env) {
    if (!request.headers.get('referer')) {
      return new Response('Forbidden', { status: 403 });
    }

    const url = new URL(request.url);

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const cached = await cache.match(cacheKey);

    if (cached) {
      const etag = request.headers.get('If-None-Match');

      if (etag && etag === cached.headers.get('ETag')) {
        return new Response(null, {
          status: 304,
          headers: cached.headers,
        });
      }

      return cached;
    }

    if (url.pathname.startsWith(IMAGE_PREFIX)) {
      const key = url.pathname.slice(IMAGE_PREFIX.length);
      const object = await env.STORAGE.get(key);

      if (!object) {
        return new Response('Not Found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('ETag', object.httpEtag);
      headers.append('Cache-Control', 's-maxage=10');

      const response = new Response(object.body, { headers });

      waitUntil(cache.put(cacheKey, response.clone()));

      return response;
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
