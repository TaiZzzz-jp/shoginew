export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 転送先URLの設定
    const HEAVY_BACKEND = 'https://xxx.fly.dev';      // 重い処理側のURL
    const RENDER_BACKEND = 'https://xxx.onrender.com'; // Render側のURL

    // パス判定（例: /api/ や /heavy/ は重いサーバーへ）
    let targetOrigin = RENDER_BACKEND;
    if (url.pathname.startsWith('/api/')) {
      targetOrigin = HEAVY_BACKEND;
    }

    const targetUrl = new URL(url.pathname + url.search, targetOrigin);

    return fetch(new Request(targetUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    }));
  },
};
