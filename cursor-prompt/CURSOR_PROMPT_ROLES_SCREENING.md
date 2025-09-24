# CURSOR TASK: Roles, Screening (Wesenstest), Emergency & Moderation

## Ziel
PWA-UI (React) mit:
- Rollenwahl: Helper {paid|free_volunteer}, Seeker {paid|free_basic}
- ScreeningWizard (de-DE, TTS + optional SpeechRecognition)
- Gates: Emergency/Nacht nur für Seeker paid + Screening=passed
- Report-Abuse-Flow, Messaging (basic), Job Create/Assign mit Eligibility

## Datenmodell
Nutze `/infra/prisma.schema` (User, Helper, Job, Message, Payment, Review, Report, ScreeningQuestion, ScreeningResult).

## Seiten/Komponenten
- pages/Onboarding.jsx
- components/RoleSelector.jsx
- components/ScreeningWizard.jsx
- components/EmergencyButton.jsx (sichtbar nur bei Seeker paid + passed)
- components/ReportAbuseModal.jsx
- components/RoleGuard.jsx (blendet unzulässige Teile aus)
- services/speechService.js (TTS + SpeechRecognition Wrapper, de-DE)
- public/manifest.json & sw.js (PWA-Basis)

## API-Aufrufe (anhand backend/api-spec.md)
- GET /api/screening/questions?audience=helper|seeker&locale=de-DE
- POST /api/screening/submit
- POST /api/jobs ; POST /api/jobs/:id/assign ; POST /api/jobs/:id/transfer ; POST /api/jobs/:id/complete
- POST /api/messages ; GET /api/messages?jobId=
- POST /api/reports

## Client-Logik
- Job Create: wenn category in ["night_care"] oder urgency="emergency":
  - blockiere, wenn SeekerRole != paid ODER Screening != passed
- Assign: blockiere, wenn HelperRole nicht in allowedHelperRoles
- TTS liest Onboarding & Fragen vor; große Buttons (>=60px), hoher Kontrast

## Env-Flags
- FEATURE_SCREENING_REQUIRED=true
- FEATURE_EMERGENCY_ENABLED=true
- MIN_SCORE_HELPER_PAID, MIN_SCORE_HELPER_FREE, MIN_SCORE_SEEKER_PAID, MIN_SCORE_SEEKER_FREE

## Tests (Stubs)
- eligibility(user, job) -> boolean (Unit)
- E2E: Onboarding -> Screening -> Night/Emergency create (Gate prüfen)
