# Projekt-Roadmap – Alltagshelfer App (MVP)

Diese Roadmap beschreibt die empfohlene Reihenfolge für den Aufbau der Alltagshelfer-Plattform.
Sie richtet sich an Nicht-Developer:innen und zeigt die wichtigsten Schritte von GitHub bis Cursor.

---

## Phase 1: Grundlagen im Repo schaffen
- [x] GitHub-Repository anlegen (`alltagshelfer`)
- [x] Basisdateien: README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md
- [x] `.gitignore` einrichten
- [x] `.env.example` ins Root legen
- [x] `infra/prisma.schema` anlegen (oder anpassen → Rollen, Screening, Reports enthalten)

👉 Ergebnis: Ein sauber vorbereitetes Repo, das von Cursor gelesen werden kann.

---

## Phase 2: Dokumentation & Regeln
- [x] `/backend/api-spec.md` → Endpunkte (Stadtplan der App)
- [x] `/docs/roles-and-permissions.md` → Wer darf was?
- [x] `/docs/screening-and-safety.md` → Wesenstest & Schutzkonzept
- [x] `/docs/moderation-policies.md` → Hausregeln & Missbrauch
- [x] `/docs/onboarding-voice-flow.md` → Audio-geführtes Onboarding
- [ ] `/docs/project-roadmap.md` → diese Datei ✅

👉 Ergebnis: Alle Kernregeln & Sicherheitsmaßnahmen sind dokumentiert.

---

## Phase 3: Cursor vorbereiten
- [x] `/cursor-prompt/CURSOR_PROMPT_ROLES_SCREENING.md` erstellen
- [ ] Repo in Cursor öffnen
- [ ] Prompt-Datei öffnen → „Generate“ ausführen
- [ ] Komponenten & Seiten automatisch erstellen lassen:
  - Onboarding (mit Screening)
  - Job Create / Assign
  - Emergency-Button
  - Report-Meldung
  - Messaging (basic)

👉 Ergebnis: Erste Version der App-Oberfläche (PWA, React).

---

## Phase 4: Backend-Stub & Testing
- [ ] Einfache Mock-APIs oder Serverless-Funktionen anlegen:
  - Auth, Screening, Jobs, Messages, Reports
- [ ] Mit Dummy-Daten testen (lokal oder Vercel/Netlify)
- [ ] Grundlegende Validierungen (Eligibility: Rollen + Screening)

👉 Ergebnis: Klickbare Demo, die mit Fake-Daten läuft.

---

## Phase 5: Erweiterungen
- [ ] Stripe-Testintegration (Payments mit Escrow)
- [ ] WebSocket für Live-Nachrichten
- [ ] Family-Access-Feature
- [ ] Analytics & Logging
- [ ] Sicherheitshärtung (Rate Limiting, GDPR-Checks)

---

## Phase 6: Launch-Vorbereitung
- [ ] Erste Community testen lassen (Pilot: Seniorenverein, Müttergruppe)
- [ ] Feedback sammeln
- [ ] Policies anpassen
- [ ] Public/Private-Repo-Entscheidung treffen (je nach Funding)

---

## Visuelle Übersicht (Flowchart)

```mermaid
flowchart TD
  A[Phase 1: Repo]()
