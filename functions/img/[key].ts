interface Env {
  BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params, waitUntil }): Promise<Response> => {
  if (!request.headers.get('referer')) {
    return new Response('Forbidden', { status: 403 });
  }

  const cache = await caches.open('nazna.dev:cache');

  const cacheKey = new Request(request.url, request);
  const cached = await cache.match(cacheKey);

  if (cached) {
    console.log(`Cached: ${cacheKey}`);
    return cached;
  }

  const key = params['key'];
  const obj = await env.BUCKET.get(`${key}.jpg`);

  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.append('ETag', obj.httpEtag);
  headers.append('Cache-Control', 'max-age=2592000');

  const response = new Response(obj.body, { headers });

  waitUntil(cache.put(cacheKey, response.clone()));

  return response;
};
