interface Env {
  BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }): Promise<Response> => {
  if (!request.headers.get('referer')) {
    return new Response('Forbidden', { status: 403 });
  }

  const key = params['key'];
  const obj = await env.BUCKET.get(`${key}.jpg`);

  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);

  return new Response(obj.body, { headers });
};
