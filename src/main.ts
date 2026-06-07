import { waitUntil } from 'cloudflare:workers';

const IMAGE_PREFIX = '/images/';

export default {
  async fetch(request, env) {
    const referer = request.headers.get('Referer');

    const url = new URL(request.url);

    if (!referer || url.origin !== new URL(referer).origin) {
      return new Response('Forbidden', { status: 403 });
    }

    if (url.pathname.startsWith(IMAGE_PREFIX)) {
      const cache = caches.default;
      const cacheKey = new Request(url.toString(), { method: 'GET' });
      const cached = await cache.match(cacheKey);

      if (cached) {
        const etag = request.headers.get('If-None-Match');
        const cachedEtag = cached.headers.get('ETag');

        if (etag && cachedEtag && etag === cachedEtag) {
          const headers = new Headers(cached.headers);
          headers.delete('Content-Length');
          headers.delete('Content-Encoding');

          return new Response(null, { status: 304, headers });
        }

        return cached;
      }

      const key = url.pathname.slice(IMAGE_PREFIX.length);
      const object = await env.STORAGE.get(key);

      if (!object) {
        return new Response('Not Found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('ETag', object.httpEtag);
      headers.set('Cache-Control', 'max-age=2592000');

      const response = new Response(object.body, { headers });

      waitUntil(cache.put(cacheKey, response.clone()));

      return response;
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
