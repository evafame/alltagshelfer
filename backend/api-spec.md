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
