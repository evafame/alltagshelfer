# CURSOR TASK: Roles, Screening (Wesenstest), Emergency & Moderation

## Ziel
Baue eine PWA-UI (React) mit:
- Rollenwahl: Helper {paid|free_volunteer}, Seeker {paid|free_basic}
- Screening-Wizard (de-DE, TTS + optional Voice Input)
- Gating: Emergency/Nacht nur für SeekerPaid + Screening=passed
- Report-Abuse-Flow
- Basis-Messaging und Job-Create mit Eligibility-Checks

## Datenmodell
Nutze das Schema aus `/infra/prisma.schema`. Felder u. a.:
- User: userType, helperRole?, seekerRole?, screeningStatus, screeningScore
- Job: urgencyLevel, serviceCategory, helperId?, seekerId
- Report, Message, Payment …

## Seiten/Komponenten
- `pages/Onboarding.jsx`: 
  - Schritt 1: userType wählen (helper/seeker/both)
  - Schritt 2: subrole wählen (paid/free_volunteer oder paid/free_basic)
  - Schritt 3: ScreeningWizard starten (abfragen via GET /api/screening/questions?audience=...)
- `components/ScreeningWizard.jsx`:
  - lädt Fragen, liest sie per TTS vor, nimmt Antworten auf (Text/Voice)
  - POST /api/screening/submit -> zeigt Score/Bestanden
- `components/EmergencyButton.jsx`:
  - sichtbar nur wenn seekerRole=paid && screeningStatus=passed
  - setzt Job mit urgency=emergency und zeigt Sicherheits-Hinweise
- `components/ReportAbuseModal.jsx`:
  - POST /api/reports (Typen: harassment, inappropriate_request, suspicious_activity)
- `components/RoleGuard.jsx`:
  - Wrapper der prüft Rolle/Screening und UI-Teile ausblendet

## Job Create / Assign (Client-Logik)
- Beim Erstellen:
  - Wenn category in ['night_care'] oder urgency='emergency':
    - blockiere, wenn Nutzer kein SeekerPaid ODER Screening!=passed
- Beim Assign:
  - blockiere, wenn Helper-Rolle nicht passt (free_volunteer darf keine Paid-Emergency Jobs)

## Speech & Accessibility
- `services/speechService.js`: TTS (de-DE) + optional SpeechRecognition
- Alle primären Buttons ≥ 60px Höhe, hoher Kontrast
- Tastaturbedienung; aria-labels; Fokus-Reihenfolge logisch

## Env-Flags (aus .env)
- FEATURE_SCREENING_REQUIRED=true
- FEATURE_EMERGENCY_ENABLED=true
- MIN_SCORE_HELPER_PAID, MIN_SCORE_HELPER_FREE, MIN_SCORE_SEEKER_PAID, MIN_SCORE_SEEKER_FREE

## Tests (mindestens stubs)
- Unit: eligibility(user, job) -> boolean
- E2E: Onboarding -> Screening -> NightJob create (soll gated sein)

## Output
- Erzeuge/aktualisiere:
  - `src/components/{ScreeningWizard,EmergencyButton,ReportAbuseModal,RoleGuard}.jsx`
  - `src/services/speechService.js`
  - `public/manifest.json`, `sw.js` (PWA-Basis)
  - Routen/Seiten für Onboarding, Jobs, Messages
