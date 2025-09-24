# Rollen & Berechtigungen (Alltagshelfer)

Dieses Dokument beschreibt, **wer** die Plattform wie nutzen darf. Es dient als Referenz für Produkt, UI und Backend-Checks.

---

## 1) Hauptrollen
- **Helper (Helfende)** – übernehmen Aufgaben
- **Seeker (Hilfesuchende)** – stellen Aufgaben ein
- **Both** – beides (wählt zusätzlich eine Unterrolle pro Seite)

## 2) Unterrollen
**Helper-Rollen**
- `paid` (zum Geld verdienen)
- `free_volunteer` (ehrenamtlich/ohne Entgelt)

**Seeker-Rollen**
- `paid` (z. B. Nachtschicht, Notfallknopf, priorisierte Vermittlung)
- `free_basic` (Basisbedürfnisse: Einkauf, Gesellschaft, leichte Hausarbeiten)

> **Warum:** Unterrollen steuern Sichtbarkeit von Jobs, Zahlungsfluss und Priorisierung.

---

## 3) Zugriffslogik (Kurzfassung)

| Feature / Kategorie          | Erlaubt für                                                 | Anmerkungen |
|-----------------------------|--------------------------------------------------------------|-------------|
| **Job posten (basic)**      | Seeker: `paid`, `free_basic`                                 |             |
| **Night Care / Nacht**      | Seeker: **`paid`** + Screening **passed**                    | Sensibel → Screening erforderlich |
| **Emergency / Notfall**     | Seeker: **`paid`** + Screening **passed**                    | Standortfreigabe + Protokoll |
| **Job übernehmen (Paid)**   | Helper: **`paid`**                                          | Volunteers nicht |
| **Job übernehmen (Free)**   | Helper: `paid`, `free_volunteer`                             |             |
| **Audio-Nachrichten**       | Alle **nach** Screening (min. pending)                       | Abuse-Reporting aktiv |
| **Job-Transfer**            | Nur Helper (aktueller Job-Inhaber)                           | Zustimmung neuer Helper nötig |
| **Bewertungen/Reviews**     | Alle nach Job-Abschluss                                      | Moderation möglich |

> **Warum:** So verhinderst du Missbrauch (z. B. Notfall nur, wenn Screening bestanden & zahlender Account).

---

## 4) Screening („Wesenstest“) – Gate
- Status: `pending` → Test ausstehend, **kein** Notfall/Nacht
- `passed` → voller Zugriff gemäß Rolle
- `failed` → Sperrfrist (z. B. 7 Tage), nur Basisfunktionen

**Mindestpunkte (Empfehlung, via ENV steuerbar):**
- Helper `paid` ≥ 70
- Helper `free_volunteer` ≥ 60
- Seeker `paid` ≥ 60
- Seeker `free_basic` ≥ 50

---

## 5) Server-Checks (Eligibility)
- **Job erstellen:**  
  - Wenn `serviceCategory ∈ {night_care}` **oder** `urgency = emergency` → require SeekerRole=`paid` **und** Screening=`passed`.
  - Setze serverseitig `allowedSeekerRoles`/`allowedHelperRoles`.
- **Assign (Job übernehmen):**  
  - Prüfe Helper-Rolle gegen `allowedHelperRoles`.
- **Messaging:**  
  - Abuse-Report immer verfügbar; Audio optional nur für verifizierte/gescreente Nutzer.

---

## 6) Beispiele
- Eine Seniorin (Seeker `free_basic`) kann **Einkauf** posten, **nicht** Notfall.
- Ein Student (Helper `free_volunteer`) darf **Free-Jobs** übernehmen, **nicht** bezahlte Nacht-/Notfalljobs.
- Ein geprüfter Pfleger (Helper `paid`, Screening `passed`) sieht **alle** Jobs inkl. Nacht/Notfall.

---

## 7) Sichtbarkeit im UI (Empfehlung)
- Verstecke Kategorien, für die die Rolle nicht berechtigt ist.
- Zeige Hinweis: „Für Notfall bitte Rolle `Seeker paid` + Wesenstest bestehen.“
- Große Buttons, TTS-Hinweise, klare Fehlermeldungen (kein Tech-Jargon).

---

## 8) Glossar
- **Role**: beschreibt Befugnisse (Helper/Seeker + Unterrolle)
- **Screening**: kurzer Eignungstest mit Punktzahl
- **Eligibility**: Server entscheidet, ob Aktion erlaubt ist
