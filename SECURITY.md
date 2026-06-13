# Security Configuration — deomic.com

## Headers implemented

| Header | Value | Protection |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years, prevents SSL stripping |
| `Content-Security-Policy` | whitelist only | Blocks XSS, data injection, unauthorized scripts |
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking via iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type confusion attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer data leakage to third parties |
| `Permissions-Policy` | camera, mic, geo = `()` | Restricts browser API access for embedded scripts |
| `X-XSS-Protection` | `1; mode=block` | Legacy browser XSS filter (defence-in-depth) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context, blocks Spectre attacks |
| `Cross-Origin-Resource-Policy` | `same-origin` | Restricts cross-origin resource reads |

## Enforcement layers

**Layer 1 (primary) — Vercel:** `vercel.json` — applied at the CDN edge before any HTML is served.

**Layer 2 (Netlify fallback) — `_headers` + `netlify.toml`:** If migrating to Netlify hosting.

**Layer 3 (HTML fallback) — `<meta http-equiv>`:** Inside `index.html` head. Browsers respect these for CSP and some other headers even without server enforcement. Useful for local file:// testing.

## After deploying

Run a verification scan at:
- https://securityheaders.com/?q=deomic.com — should now score **A+**
- https://ssllabs.com/ssltest/analyze.html?d=deomic.com — SSL rating
- https://developer.mozilla.org/en-US/observatory — Mozilla Observatory

## HSTS preload

After confirming headers are live and stable, submit to the HSTS preload list:
https://hstspreload.org/?domain=deomic.com

This bakes deomic.com into browsers' built-in HTTPS-only lists.
