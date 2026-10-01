# Quote delivery acknowledgements — 2026-09-30

The quote API previously returned success even when every contact channel was unconfigured or failed. Webhook/email result objects were discarded, and the final response was always successful after delivery attempts. The customer could see a confirmation even though no contact handoff was acknowledged.

## Automatic fix

- Preserve webhook/email `{ delivered }` and Manager `{ forwarded }` outcomes.
- Respond with success only after at least one of those contact channels acknowledges the request. A successful Facebook conversion event does not qualify.
- Return HTTP 503, `ok: false`, and the configured phone fallback when no contact channel acknowledges the request.
- Keep the existing concurrent delivery attempts and allow partial failures: a successful contact handoff remains successful even if another channel or analytics fails.
- Log each channel as delivered, skipped, or failed. Missing configuration no longer logs successful delivery. Provider response bodies and delivery exception details are not copied into channel summaries or the client response.
- Preserve current field validation, attribution payloads, redacted contact logging, rate limiting, honeypot handling, and generic HTTP 500 fallback.

The existing shared QuoteForm already keeps field state on an unsuccessful response, focuses its error notice, offers a telephone link, and only enters its confirmation view when both HTTP status and response `ok` indicate success. No form change was necessary.

## Validation

The regression script `scripts/check-lead-delivery.mjs` transpiles and executes the actual route with synthetic environment configuration and mocked fetch, SMTP, Manager intake, and NextResponse. It loads the real installed-Zod quote schema except when isolating the pre-existing decoy branch. It does not read local credentials or send any external request, lead, email, or conversion event.

All 14 cases passed:

1. All contact/analytics channels unconfigured: 503 and honest skipped logs.
2. All configured channels fail: 503 with no provider-private text leakage.
3. Network exceptions: no false success.
4. Facebook-only success: 503.
5. Webhook-only success: 200.
6. Email-only success: 200.
7. Manager-only success: 200 with preserved job/contact fields.
8. Partial channel/analytics failures with a successful contact handoff: 200.
9. All configured channels succeed: all receive the valid request.
10. Invalid real-schema phone input: 400 and no delivery attempts.
11. Populated honeypot rejected by the existing real schema: 400 and no attempts.
12. Isolated existing honeypot decoy branch: 200 and no attempts.
13. Ninth request from the same IP: existing 429 limit prevents another handoff.
14. Malformed JSON: existing generic 500 with no delivery attempts.

Repository typecheck, scoped ESLint for the route/test script, and cached Prettier formatting passed after the change. The root task adds the npm shortcut and runs the integrated build/checks.

## Limits and existing behavior

An acknowledgement proves a provider accepted the handoff, not that a staff member read it or an email reached the inbox. Production credentials/destination configuration and end-to-end delivery were not tested by sending real leads. Existing network timeout behavior is unchanged.

The current schema rejects nonempty `website` values before the route's existing honeypot-decoy check. This behavior was preserved rather than changing the validation contract during the acknowledgement fix; both validation and the isolated branch have coverage.
