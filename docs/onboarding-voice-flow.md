# Onboarding Flow (Audio-First)

Dieses Dokument beschreibt den geplanten Ablauf, wenn neue Nutzer:innen die App das erste Mal starten. Fokus: Barrierefreiheit und klare Sprache.

---

## 1) Ziele
- Nutzer:innen sicher und stressfrei einführen.
- Rollenwahl (Helper/Seeker + Unterrolle).
- Screening („Wesenstest“) direkt als Teil der Einführung.
- Erste Sicherheits-Features erklären (Notfallknopf, Meldungen).
- Möglichst wenige Klicks, viel Sprachführung.

---

## 2) Ablaufübersicht
1. **Begrüßung (Audio)**
   - „Willkommen bei Alltagshelfer. Ich begleite Sie Schritt für Schritt.“
   - Sprache auswählen (z. B. Deutsch, Türkisch, Englisch).
   - Alle Texte werden vorgelesen, Buttons groß dargestellt.

2. **Rollenwahl**
   - Frage: „Möchten Sie Hilfe erhalten, Hilfe anbieten oder beides?“
   - Auswahl per Touch oder Sprachkommando: *Helfer / Hilfesuchender / Beides*.
   - Bei Wahl: nächste Unterrolle.

3. **Unterrolle**
   - Für Helfer: „Möchten Sie bezahlte Hilfe leisten oder ehrenamtlich unterstützen?“
   - Für Hilfesuchende: „Möchten Sie nur Basisaufgaben einstellen oder auch Notfall- und Nachtjobs?“
   - Auswahl per Button oder Sprachkommando.

4. **Screening (Wesenstest)**
   - „Wir stellen Ihnen ein paar kurze Fragen, um sicherzustellen, dass unsere Gemeinschaft geschützt ist.“
   - Fragen werden vorgelesen, Antworten per Sprache oder Touch.
   - Ergebnis (bestanden/nicht bestanden) wird vorgelesen + angezeigt.

5. **Erklärung der wichtigsten Features**
   - Notfallknopf (falls Rolle `Seeker paid` + Screening bestanden).
   - Melden-Funktion: „Wenn Sie sich unwohl fühlen, können Sie jederzeit 'Melden' sagen oder den Button drücken.“
   - Zahlungsablauf (nur kurz, einfache Sprache).

6. **Bestätigung**
   - Nutzer:in bestätigt AGB + Policies (per Sprache: „Ja, ich stimme zu“ oder Button).
   - Status in DB: `acceptedPoliciesAt` gesetzt.

7. **Startseite**
   - Helfer: Liste offener Jobs (gefiltert nach Rolle).
   - Hilfesuchende: Button „Job einstellen“ + Hinweis auf Notfallfunktion.

---

## 3) Barrierefreiheits-Details
- Alle Texte: TTS (Text-to-Speech), Geschwindigkeit einstellbar.
- Alle Eingaben: per Touch **oder** Sprache möglich.
- Buttons: ≥ 60px, hoher Kontrast, klare Labels („Ja“, „Nein“, „Zurück“).
- Visuelle Hinweise + Audio-Feedback (z. B. *„Ihre Antwort wurde gespeichert“*).

---

## 4) Sicherheitsanker
- Screening darf nicht übersprungen werden.
- Emergency-Button erscheint nur für SeekerPaid + Screening=passed.
- Meldung-Button immer sichtbar, Audio-Befehl „Melden“ immer aktiv.

---

## 5) Technische Hinweise
- Onboarding-Flow als eigene Seite/Route (`/onboarding`).
- Speichert Rolle, Unterrolle, Screening-Status, Policy-Zustimmung in `User`.
- Fortschritt abspeichern, falls Onboarding abgebrochen wird.
- Wiederaufnahme möglich („Sie waren beim Screening. Möchten Sie fortfahren?“).
