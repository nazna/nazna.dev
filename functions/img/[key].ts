interface Env {
  BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context): Promise<Response> => {
  const request: Request = context.request;
  const env: Env = context.env;

  if (!request.headers.get('referer')) {
    return new Response('Forbidden', { status: 403 });
  }

  console.log(await env.BUCKET.list());

  const key = context.params['key'];
  const obj = await env.BUCKET.get(`${key}.jpg`);

  if (!obj) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);

  return new Response(obj.body, { headers });
};
