# Alltagshelfer — audio-first local helper marketplace

**Purpose:** A responsive, audio-first web app matching local helpers with elderly people and overwhelmed parents for daily tasks. Paid service with escrow payments and helper-to-helper transfer.

This repository contains the design, DB schema, frontend components, and serverless functions to build Alltagshelfer. It’s structured for fast no-code / low-code composition (Cursor.ai) and progressive enhancement into a full-stack app.

## Highlights
- Audio-first UX (Web Speech API & TTS)
- Geolocation-based matching (5–20 km radius)
- Stripe-based escrow payments
- Real-time messaging (WebSocket)
- PWA & offline-first core features
- GDPR & security-first design

## How to use
1. Import `cursor-prompt/CURSOR_PROMPT.md` to Cursor.ai (or use the content as the seed prompt).
2. Use the `infra/prisma.schema` as DB blueprint (adapt to your DB).
3. Deploy serverless functions in `backend/serverless` (Stripe, webhooks, socket fallback).
4. Build the frontend from `frontend/src` with a React-based no-code export or hand-coded frontend.

## License
MIT — see LICENSE

## Contributing
See CONTRIBUTING.md
