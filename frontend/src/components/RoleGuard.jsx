Projekt: Alltagshelfer (Audio-first Helferplattform)
Repo: GitHub ist vorbereitet. Bitte baue in Cursor:

Onboarding mit Rollenwahl (Helper paid/free_volunteer, Seeker paid/free_basic)

ScreeningWizard (de-DE, TTS + optional SpeechRecognition)

Gates: Emergency/Nacht nur für Seeker paid + Screening=passed

ReportAbuseModal, Messaging (basic), Job Create/Assign mit Eligibility
Datenmodell: /infra/prisma.schema
API-Fahrplan: /backend/api-spec.md
Prompt: /cursor-prompt/CURSOR_PROMPT_ROLES_SCREENING.md
Bitte generiere:

src/components/{RoleSelector,ScreeningWizard,EmergencyButton,ReportAbuseModal,RoleGuard}.jsx

src/services/speechService.js

public/manifest.json + sw.js (PWA)
Danach kurze Testrunde nach /docs/testing-checklist.md.
