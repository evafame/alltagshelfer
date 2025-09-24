# API Spec (MVP Alltagshelfer)

## Auth
POST /api/auth/signup              # registrieren
POST /api/auth/login               # einloggen
GET  /api/auth/me                  # aktuelles Profil

## Users & Rollen
GET  /api/users/:id
PUT  /api/users/:id                # Profil/Rollen/Adresse
POST /api/users/:id/verify         # Admin: Verifizierung setzen
POST /api/users/:id/background     # Admin: Background-Check-Status

## Screening („Wesenstest“)
GET  /api/screening/questions?audience=helper|seeker&locale=de-DE
POST /api/screening/submit         # { answers:[{questionId, answer}], audience }
GET  /api/screening/result/:userId

## Jobs
POST /api/jobs                     # erstellt Job; prüft seekerRole + screeningStatus
GET  /api/jobs?lat=&lng=&radius=&category=
GET  /api/jobs/:id
POST /api/jobs/:id/assign          # prüft helperRole + eligibility
POST /api/jobs/:id/transfer        # helper->helper Übergabe
POST /api/jobs/:id/complete        # markiert abgeschlossen

## Payments (Stripe Escrow)
POST /api/payments/create-intent   # PaymentIntent (Testmodus)
POST /api/payments/webhook         # Stripe-Events

## Messaging
POST /api/messages                 # text/audio
GET  /api/messages?jobId=

## Reports / Moderation
POST /api/reports                  # Missbrauch melden
GET  /api/reports                  # Admin
POST /api/reports/:id/action       # Admin: sperren/schließen

# Eligibility/Gates (Server-Logik)
# - Job create: wenn category 'night_care' oder urgency 'emergency' -> seekerRole muss 'paid' UND screeningStatus 'passed'
# - Assign: helperRole muss in allowedHelperRoles passen
# - Screening-Score-Thresholds aus ENV (z. B. MIN_SCORE_HELPER_PAID)

## Standards
- Auth: Bearer JWT im Header `Authorization: Bearer <token>`
- JSON überall: `Content-Type: application/json`
- Paginierung: `?page=<n>&limit=<n>` (Default: 20)
- Fehlerformat:
  { "error": { "code": "VALIDATION_ERROR", "message": "...", "details": {...} } }
## Convenience Endpoints
GET  /api/me                       # aktueller User inkl. Rollen/Screening kompakt
GET  /api/users/:id/jobs           # Jobs eines Users (als Seeker)
GET  /api/users/:id/assignments    # Jobs eines Users (als Helper)
GET  /api/helpers?lat=&lng=&radius=&service=&role=paid|free_volunteer
GET  /api/jobs/:id/payments        # Zahlungen zu einem Job
GET  /api/jobs/:id/messages        # Nachrichten-Thread
## Reviews
POST /api/reviews                  # { jobId, revieweeId, rating, text }
GET  /api/reviews?userId=...       # Durchschnitt, Liste
## Family Access
GET  /api/family-access/:userId
POST /api/family-access/:userId    # { emails: ["...","..."] }  (setzt/ersetzt)
## WebSocket Events (Names)
- message:new           # neue Nachricht
- job:assigned          # Job zugewiesen
- job:transfer_requested
- job:transfer_updated
- job:completed
- payment:status        # pending/held/released/refunded
## Payments Hinweise
- Testmodus mit PaymentIntent; Escrow via delayed capture oder Connect-Transfer
- Felder: { amount, currency="eur", jobId } -> clientSecret zurückgeben
- Webhook-Events: payment_intent.succeeded, payment_intent.payment_failed, charge.refunded
