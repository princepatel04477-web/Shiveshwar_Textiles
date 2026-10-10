// Secrets set with `wrangler secret put` (not listed in wrangler.jsonc, so `wrangler types` can't see them)
declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
  }
}
