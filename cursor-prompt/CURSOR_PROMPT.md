# CURSOR PROMPT — Build "Alltagshelfer" audio-first community helper marketplace

Goal: Generate a responsive PWA web app that connects local help seekers to helpers. Audio-first UX for elderly and overwhelmed parents. Paid service with escrow.

## Build requirements
- Platform: responsive web (React-compatible)
- Use Web Speech API: voice commands, speech-to-text for job posting, text-to-speech for reading content
- Geolocation: match helpers within radius configurable (5-20 km)
- Payments: Stripe Connect or PaymentIntent-based escrow (funds held until job completion)
- Real-time: WebSocket (Socket.IO or native) for messaging and live job updates
- Accessibility: large buttons (>=60px), high contrast, semantic HTML, keyboard and screen-reader friendly
- Offline: service worker, local cache for job list, read-later TTS queue

## Deliverables (Cursor should create)
1. Pages:
   - Landing page with simple voice CTA: "Find helper" / "Offer help"
   - Voice-guided onboard flows for Seekers & Helpers
   - Job posting flow (voice first, optional text)
   - Helper search & filter (radius, availability, rating, languages)
   - Messaging page with audio messages
   - Job detail page (status, payments, transfer, completion)
   - Helper network / community board
   - Family access management page

2. Data model (implement exactly as given in `infra/prisma.schema`).

3. Integrations:
   - Stripe flow stub (create PaymentIntent; hold funds; release on completion).
   - WebSocket endpoints for messaging and job events.
   - Optional background-check webhook (stub).

4. Components:
   - VoiceNavigator: accepts commands: "Find helper for shopping", "Post job", "My messages"
   - AudioRecorder: record & upload voice messages
   - LargeButton: accessible touch target
   - TTS player with adjustable speed

5. PWA: manifest, service worker, offline caching.

6. Security & GDPR:
   - Role-based auth stub
   - Data retention and deletion endpoints
   - Explicit consent screens for audio recording & data processing

7. Testing:
   - Accessibility checks (WCAG basic)
   - Edge cases: low bandwidth, offline, partial geolocation

## UI & UX tone
- Calm, friendly, minimal
- High-contrast colors, large fonts
- Use audio confirmations and optional haptic patterns (mobile)

## Behavior specifics
- Helpers can transfer jobs to each other; transfers create a pending approval record; original helper and transfer recipient get notifications
- Private family access: allow family_access_emails to manage seeker accounts
- Emergency control: always show an emergency call button on mobile

## Output format
- Create a repository skeleton with files (README, frontend components, backend stubs, DB schema)
- Provide code snippets for Web Speech API usage, PWA service worker, and stripe serverless handlers
- Provide JSON manifest for Cursor.ai (optional) and export-ready pages

Build now: produce the file tree and all files content as commit-ready text.
