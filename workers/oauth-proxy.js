/**
 * Cloudflare Worker — GitHub OAuth proxy for Decap CMS on GitHub Pages
 *
 * Deploy: see ADMIN_SETUP.md
 * Env vars: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_ORIGIN
 */

const JSON_HEADERS = { 'Content-Type': 'application/json' }

function corsHeaders(origin, allowedOrigin) {
  if (origin !== allowedOrigin) return null
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const allowedOrigin = env.ALLOWED_ORIGIN || 'https://nardebanshatranj.github.io'
    const origin = request.headers.get('Origin') || allowedOrigin
    const cors = corsHeaders(origin, allowedOrigin)

    if (request.method === 'OPTIONS' && cors) {
      return new Response(null, { status: 204, headers: cors })
    }

    if (url.pathname === '/auth') {
      const site = url.searchParams.get('site_id') || allowedOrigin
      const provider = url.searchParams.get('provider') || 'github'
      if (provider !== 'github') {
        return htmlResponse('Provider not supported', 400)
      }

      const redirectUri = `${url.origin}/callback`
      const state = crypto.randomUUID()
      const authUrl = new URL('https://github.com/login/oauth/authorize')
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('scope', 'repo,user')
      authUrl.searchParams.set('state', state)

      const headers = new Headers({ Location: authUrl.toString() })
      headers.append(
        'Set-Cookie',
        `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      )
      headers.append(
        'Set-Cookie',
        `oauth_site=${encodeURIComponent(site)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      )

      return new Response(null, { status: 302, headers })
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code')
      const state = url.searchParams.get('state')
      const cookies = Object.fromEntries(
        (request.headers.get('Cookie') || '')
          .split(';')
          .map((c) => c.trim().split('='))
          .filter(([k]) => k),
      )

      if (!code || !state || cookies.oauth_state !== state) {
        return htmlResponse('خطا در احراز هویت. پنجره را ببندید و دوباره تلاش کنید.', 400)
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      })

      const tokenData = await tokenRes.json()
      if (!tokenData.access_token) {
        return htmlResponse('دریافت توکن از گیت‌هاب ناموفق بود.', 400)
      }

      const content = `
        <script>
          (function () {
            var msg = ${JSON.stringify({
              token: tokenData.access_token,
              provider: 'github',
            })};
            function send() {
              if (window.opener) {
                window.opener.postMessage(
                  'authorization:github:success:' + JSON.stringify(msg),
                  ${JSON.stringify(allowedOrigin)},
                );
              }
            }
            send();
            document.body.innerHTML = '<p style="font-family:tahoma;text-align:center;padding:2rem">ورود موفق — این پنجره را ببندید.</p>';
          })();
        </script>
      `
      return htmlResponse(content)
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS })
    }

    return new Response('Not found', { status: 404 })
  },
}
