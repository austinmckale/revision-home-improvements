# Monitoring and Ops

## Runtime checks

- Health endpoint: `GET /healthz`
- Lead endpoint: `POST /api/quote`

## Vercel logs

1. Open Vercel project dashboard.
2. Check `Functions` logs for `/api/quote`.
3. Confirm successful lead payload delivery to your webhook endpoint.

## Uptime monitoring

Monitor at least:

- `/`
- `/request-a-quote`
- `/healthz`

Recommended intervals:

- Home + quote page: every 5 minutes
- Health endpoint: every 1 minute

## Conversion monitoring

Track these events in GA4:

- `click_to_call`
- `generate_lead`

Compare:

- Sessions -> quote form submissions
- Sessions -> click-to-call events
- Landing page -> conversion rate by service/city route
