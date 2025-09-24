# Screening („Wesenstest“) & Safety-Konzept

Dieses Dokument beschreibt das Screening-Verfahren für Nutzer:innen sowie Maßnahmen zur Sicherheit und Missbrauchsprävention.

---

## 1) Ziel
- Missbrauch der Plattform verhindern (z. B. Prostitution, illegale Dienste).
- Geeignete Helfende für sensible Aufgaben (z. B. Notfall, Nachtpflege) identifizieren.
- Vertrauen und Transparenz für Hilfesuchende und Helfende schaffen.

---

## 2) Aufbau des Wesenstests
- 10–15 Fragen (Multiple Choice + Szenarien).
- Unterschiedliche Sets für **Helper** und **Seeker**.
- Punktevergabe pro Antwort (–10 bis +10).
- Mindestscore abhängig von Rolle (steuerbar via ENV).

### Mindestpunkte (Empfehlung)
- Helper `paid`: ≥ 70  
- Helper `free_volunteer`: ≥ 60  
- Seeker `paid`: ≥ 60  
- Seeker `free_basic`: ≥ 50  

---

## 3) Beispiel-Fragen

### Für Helper
**Szenario:** Ein/e Hilfesuchende:r bittet dich um „private Dienste“ außerhalb der Plattform.  
- a) Ich lehne ab und melde den Vorfall. *(+10)*  
- b) Ich überlege, weil es mehr Geld gibt. *(0)*  
- c) Ich akzeptiere, solange bar bezahlt wird. *(–10)*  

**Grenzen & Ethik:** Welche Aufträge nimmst du **nicht** an?  
- a) Sexuelle Dienstleistungen *(+10)*  
- b) Illegale Aktivitäten *(+10)*  
- c) Aufgaben, die gefährlich sind *(+5)*  
- d) Alles, solange gut bezahlt *(–10)*  

### Für Seeker
**Respekt:** Welche Anfragen sind **nicht erlaubt**?  
- a) Sexuelle Dienste *(+10)*  
- b) Illegale Aktivitäten *(+10)*  
- c) Aufgaben außerhalb des vereinbarten Rahmens *(+5)*  
- d) Alles, wenn ich bezahle *(–10)*  

---

## 4) Durchsetzung
- `pending`: Test noch nicht gemacht → kein Notfall/Nacht möglich.  
- `passed`: voller Zugriff entsprechend Rolle.  
- `failed`: Sperrfrist (z. B. 7 Tage), nur Basisfunktionen erlaubt.  

---

## 5) Moderation & Meldesystem
- In-App „Melden“-Button (z. B. bei Nachrichten oder Jobs).
- Beweise können hochgeladen werden (Audio, Screenshots).
- Moderations-Dashboard mit Status: `open`, `in_review`, `action_taken`, `dismissed`.

---

## 6) Technische Umsetzung
- Fragen + Scoring als JSON in DB (`ScreeningQuestion`).
- Ergebnisse + Punktzahl in `ScreeningResult`.
- Prüfung durch Backend:
  - Jobs mit Kategorie `night_care` oder `urgency=emergency` nur für Seeker `paid` + Screening `passed`.
  - Job-Übernahme: Helper-Rolle + Screening prüfen.

---

## 7) Sicherheit allgemein
- **Verboten:** sexuelle Dienstleistungen, illegale Aktivitäten, Gewalt.
- **Erkennung:** Keyword-Filter + Meldungen.
- **Maßnahmen:** Sofortsperre bei harten Verstößen, temporäre Sperre bei wiederholten Grenzfällen.
- **Datenschutz:** Beweise zeitlich begrenzt speichern, GDPR-konform.

---
