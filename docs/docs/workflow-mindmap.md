# Workflow – Bauplan → Cursor → App → Test → Launch

Die Grafik unten zeigt den End-to-End-Ablauf. Du kannst sie 1:1 in GitHub ansehen.

```mermaid
flowchart TD
  A[📘 GitHub: Bauplan erstellen] --> B[🤖 Cursor: Code generieren]
  B --> C[🧪 Lokal testen]
  C -->|Fehler/Ideen| A
  C --> D[⚙️ Backend-Stubs & Integrationen]
  D --> E[🚀 Pilot & Feedback]
  E -->|Lernen| A

  subgraph A1[Inhalt von A (Bauplan)]
    A1a[infra/prisma.schema]
    A1b[backend/api-spec.md]
    A1c[cursor-prompt/CURSOR_PROMPT_ROLES_SCREENING.md]
    A1d[docs/* (Roles, Screening, Moderation, Roadmap, Shortcuts)]
    A1e[.env.example]
  end

  A --> A1
  B --> B1[UI: Onboarding, ScreeningWizard, EmergencyButton, ShortcutsHelp, RoleGuard]
  B --> B2[Services: speechService, deeplink utils, PWA (manifest, sw)]

  subgraph C1[Testing (nach docs/testing-checklist.md)]
    C1a[Accessibility: ≥60px Buttons, TTS]
    C1b[Eligibility: Rollen & Screening-Gates]
    C1c[Flows: Notfall, Job erstellen/übernehmen]
    C1d[Offline/PWA: manifest & sw]
  end

  C --> C1
  D --> D1[Stripe (Testmodus) & Webhooks]
  D --> D2[WebSocket/Realtime]
  D --> D3[Seeds & Demo-Daten]
  E --> F[🔁 Iterationen bis MVP stabil]
