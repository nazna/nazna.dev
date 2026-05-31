const IMAGE_PREFIX = '/images/';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith(IMAGE_PREFIX)) {
      const key = url.pathname.slice(IMAGE_PREFIX.length);
      const object = await env.STORAGE.get(key);

      if (!object) {
        return new Response('404 Not Found.', { status: 404 });
      }

      return new Response(object.body);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
