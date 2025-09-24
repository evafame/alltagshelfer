# Testing-Checklist (MVP) – Alltagshelfer

Nutze diese Liste beim ersten Durchklicken deiner App (Cursor-Output).  
Hake ab, notiere Fehler einfach darunter.

---

## 1) Accessibility (Barrierefreiheit)
- [ ] **Buttons ≥ 60px** hoch, hoher Kontrast  
  *Erwartung:* Alle großen Hauptaktionen gut klickbar
- [ ] **Tastaturbedienung** (Tab/Enter)  
  *Erwartung:* Fokus-Ring sichtbar, Reihenfolge logisch
- [ ] **Screenreader-Texte / ARIA-Labels**  
  *Erwartung:* Wichtige Buttons klar benannt („Job erstellen“, „Melden“)

## 2) Voice / TTS
- [ ] **Texte werden vorgelesen** (TTS)  
  *Erwartung:* Begrüßung + Onboarding-Schritte hörbar
- [ ] **Sprachbefehle** (falls implementiert)  
  *Erwartung:* „Job erstellen“ startet den Flow bzw. zeigt Formular
- [ ] **Fallback** ohne Mikrofon  
  *Erwartung:* App bleibt nutzbar per Touch

## 3) Onboarding & Rollen
- [ ] **Rollenwahl** (Helper/Seeker/Both)  
  *Erwartung:* Auswahl wird gespeichert und in der UI reflektiert
- [ ] **Unterrollen** (Helper: paid/free_volunteer; Seeker: paid/free_basic)  
  *Erwartung:* UI/Filter ändern sich entsprechend
- [ ] **AGB/Policies Zustimmung**  
  *Erwartung:* Bestätigung setzt `acceptedPoliciesAt`

## 4) Screening („Wesenstest“)
- [ ] **Fragen laden** (Helper-/Seeker-Set)  
  *Erwartung:* 10–15 Fragen erscheinen, TTS liest vor
- **Zwei Durchläufe:**
  - [ ] **Bestehen** (Score über Schwelle)  
    *Erwartung:* Status = `passed`; gesperrte Features werden freigeschaltet
  - [ ] **Nicht bestehen**  
    *Erwartung:* Klarer Hinweis + Sperrung sensibler Funktionen

## 5) Job-Flow
- [ ] **Job erstellen (basic)**  
  *Erwartung:* Seeker (paid/free_basic) kann Kategorie „shopping“ posten
- [ ] **Night/Emergency** (nur Seeker `paid` + Screening `passed`)  
  *Erwartung:* Fehlermeldung, wenn Voraussetzungen fehlen; sonst Erstellung klappt
- [ ] **Jobsuche nach Radius**  
  *Erwartung:* Nahe Jobs sichtbar, weiter entfernte ausgeblendet
- [ ] **Job übernehmen**  
  *Erwartung:* Helper `paid` darf Paid-Jobs, `free_volunteer` nur Free-Jobs

## 6) Payments (Testmodus)
- [ ] **PaymentIntent erstellen** (wenn Stub vorhanden)  
  *Erwartung:* Klare Bestätigung; kein echter Zahlungsabfluss
- [ ] **Status-Änderungen** (pending → held → released)  
  *Erwartung:* UI zeigt konsistenten Statusfluss

## 7) Messaging
- [ ] **Textnachricht senden/empfangen**  
  *Erwartung:* Nachricht erscheint direkt (oder nach Reload bei Mock)
- [ ] **Audio-Nachricht** (falls vorhanden)  
  *Erwartung:* Aufnahme/Abspielen funktioniert, Datei verlinkt
- [ ] **Melden-Button**  
  *Erwartung:* Report-Dialog öffnet sich; Bestätigung nach Senden

## 8) Moderation & Reporting
- [ ] **Report-Fall anlegen**  
  *Erwartung:* Status = `open`, Eintrag erscheint in Liste (Admin-Ansicht optional)
- [ ] **Maßnahme simulieren**  
  *Erwartung:* Statuswechsel `in_review` → `action_taken` / `dismissed`

## 9) PWA & Offline
- [ ] **manifest.json vorhanden**  
  *Erwartung:* App-Name/Icon sichtbar
- [ ] **Service Worker aktiv**  
  *Erwartung:* Seiten laden bei schlechtem Netz; Grundseiten sind gecacht
- [ ] **Offline Fallback**  
  *Erwartung:* Offline-Hinweis statt Fehlerseite

## 10) Datenschutz & Sicherheit (light)
- [ ] **Kein Klartext von Secrets** (z. B. Stripe Key) im Frontend  
  *Erwartung:* Keys nur in Server/ENV, nicht im Clientcode
- [ ] **AGB/Code of Conduct verlinkt**  
  *Erwartung:* im Onboarding oder Footer zugänglich
- [ ] **Profil-/Adresssichtbarkeit**  
  *Erwartung:* Keine genauen Adressen öffentlich ohne Zustimmung

## 11) Performance & Stabilität
- [ ] **Ladezeit Startseite < 3s** (bei normalem Netz)  
  *Erwartung:* keine übergroßen Bilder/Assets
- [ ] **Fehlermeldungen**  
  *Erwartung:* Menschliche Texte (kein Tech-Jargon), TTS liest vor

## 12) Geräte & Browser (Kurz-Matrix)
Teste mindestens:
- [ ] **iPhone (Safari)**
- [ ] **Android (Chrome)**
- [ ] **Desktop Chrome**
- [ ] **Desktop Firefox**
- [ ] **Desktop Safari** (wenn möglich)

## 13) Mini-Datenset (optional)
- [ ] **Seed-Job** vorhanden (`infra/example-job.json`)  
  *Erwartung:* Jobliste zeigt den Eintrag
- [ ] **2–3 Test-User** (verschiedene Rollen)  
  *Erwartung:* Gates verhalten sich je Rolle korrekt

## 14) Regression (wenn du ändertst)
- [ ] Nach Update: Onboarding erneut kurz durchklicken  
- [ ] Night/Emergency-Gates prüfen  
- [ ] Messaging senden/empfangen

---

### Fehler notieren
- **Schritt:**  
- **Was ist passiert:**  
- **Erwartet:**  
- **Screenshot/Notiz:**  

---

### Go-Live Mini-Check
- [ ] `.env` **nicht** im Repo  
- [ ] README kurz & aktuell  
- [ ] Policies/CoC verlinkt  
- [ ] Test-Zahlungen auf Stripe-Dashboard sichtbar (nur Testmodus)
