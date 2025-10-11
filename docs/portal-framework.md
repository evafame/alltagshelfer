# Alltagshelfer Portal – Framework & Architektur

## Ziel
Ein digitales Vergleichs- und Informationsportal für soziale Dienste in Deutschland.  
Es soll Bürger:innen, Angehörigen und pflegenden Personen helfen, **passende, geprüfte und bezahlbare Unterstützung** zu finden – inklusive der Information, **welche Leistungen über die Krankenkasse abrechenbar sind.**

---

## 1. Leitidee
„Alltagshelfer Portal – Dein Weg durch den Sozialdschungel.“

> Menschen verstehen endlich, welche Hilfen ihnen zustehen, wer sie anbietet und wie sie sie beantragen.

- Fokus: Transparenz, Vertrauen, Barrierefreiheit  
- Primärzielgruppe: ältere Menschen, pflegende Angehörige, Familien in Belastungssituationen  
- Sekundärzielgruppe: Sozialdienste, Pflegeanbieter, Versicherungen, Kommunen  

---

## 2. Hauptfunktionen (MVP)

| Bereich | Beschreibung |
|----------|--------------|
| **Anbieterverzeichnis** | Such- & Filterfunktion nach Postleitzahl, Kategorie, Kassenzulassung |
| **Kassenkompatibilität** | Badge „Über Krankenkasse abrechenbar“ mit Paragraf (z. B. §38 SGB V, §45 SGB XI) |
| **Leistungsrechner** | Rechnet Eigenanteil / Zuschüsse je Krankenkasse & Leistungstyp |
| **Antragshelfer** | Interaktive Schritt-für-Schritt-Anleitung inkl. PDF-Formulare & Audio-Erklärung |
| **Eva Audio-Assistentin** | Barrierefreie Sprachausgabe (Text-to-Speech) & einfache Fragenbeantwortung |
| **Bewertungen (optional)** | Erfahrungsberichte über Anbieter, moderiert & verifiziert |
| **Partner-API Layer (später)** | Schnittstellen zu Krankenkassen, Pflegestützpunkten, Sozialämtern |

---

## 3. Technische Struktur (Phase 1)

### Frontend
- **Framework:** React / Next.js (alternativ No-Code MVP: Softr, Webflow, Glide)
- **Ziele:**  
  - Responsive, PWA-fähig  
  - Barrierefrei (ARIA, große Schrift, hoher Kontrast)  
  - Audio-First optional (Web Speech API)

### Backend / Datenhaltung
- **Start:** statische JSON-Datenbank (`/infra/social-services-seed.json`)
- **Später:** PostgreSQL oder Supabase
- **Hauptfelder:**
  ```json
  {
    "id": "uuid",
    "name": "Caritas Sozialstation Ludwigshafen",
    "category": "Haushaltshilfe",
    "city": "Ludwigshafen",
    "zip": "67059",
    "contact": "info@caritas.de",
    "phone": "0621-123456",
    "url": "https://caritas-lu.de",
    "is_insurance_covered": true,
    "legal_basis": "§38 SGB V",
    "hourly_rate": 32.5,
    "insurance_rate": 0,
    "description": "Haushaltsnahe Unterstützung und Betreuung im Alltag",
    "verified_partner": true,
    "free_capacity": "2 Plätze frei"
  }

