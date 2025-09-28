# Dialog-Flow: Job-Anfrage (Voice-first) – mit Fallbacks

Die Grafik zeigt den Gesprächsablauf zwischen Seeker, Assistentin „Eva“ und potenziellen Helfer:innen – inkl. Alternativen, wenn niemand sofort verfügbar ist.

```mermaid
flowchart TD
  %% Einstieg
  A([Seeker: "Brauche Hilfe beim Einkaufen – jetzt?"]) --> B{Verfügbare Helfer<br/>im Radius (z.B. 5–20 km)?}

  %% JA-Zweig: Treffer gefunden
  B -- Ja --> C[Assistentin: "Sarah 5 Min entfernt, Gold-Badge.<br/>Profil zeigen? Preis 12€/h?"]
  C --> D{Profil ok?}
  D -- Nein --> H1[Anderen Helfer im Treffer-Pool vorschlagen] --> C
  D -- Ja --> E{Zeitwunsch möglich? <br/>(z.B. in 2 Std)}
  E -- Nein --> E2[Alternative Zeiten anbieten<br/>(früher/später, heute/später)] --> E
  E -- Ja --> F{Zusatzaufgaben? <br/>(z.B. Küche aufräumen)}
  F -- Ja --> F1{Helfer kann Zusatz?}
  F1 -- Nein --> F2[Alternative: Zusatz später / anderer Helfer] --> F
  F1 -- Ja --> G{Zahlung wann? <br/>vorab (escrow) / nachher}
  F -- Nein --> G

  G -- Vorab --> G1[PaymentIntent (escrow) anlegen]
  G -- Nachher --> G2[Ohne Vorabzahlung fortfahren]
  G1 --> I[Anfrage senden an Helfer]
  G2 --> I
  I --> J{Helfer bestätigt?}
  J -- Ja --> K([Termin steht – Job in_progress])
  J -- Nein --> H1

  %% NEIN-Zweig: Kein sofortiger Treffer
  B -- Nein --> L[Assistentin: "Kein Helfer sofort. Optionen: <br/>1) Lieferdienst (~4h) <br/>2) Radius erweitern (Fahrtkosten) <br/>3) Späterer Termin <br/>4) Broadcast an Community"]
  L --> M{Option gewählt?}
  M -- 1) Lieferdienst --> L1[Lieferdienst buchen? <br/>(Bestellfenster, ETA, Kosten)] --> K2([Bestellung bestätigt])
  M -- 2) Radius+Fahrtkosten --> N{Neuer Radius Treffer?}
  N -- Nein --> L2[Weitere Optionen anbieten<br/>(Späterer Termin / Broadcast)] --> M
  N -- Ja --> C

  M -- 3) Späterer Termin --> E   %% führt in den Zeitwahl-Knoten
  M -- 4) Broadcast --> P[Job als "Dringend" posten, <br/>Push/SMS an Helfer-Netz] --> Q{Antworten eingetroffen?}
  Q -- Ja --> C
  Q -- Nein --> R[Warteliste/Benachrichtigung setzen] --> S([Assistentin informiert bei erstem Treffer])

  %% Notfall-Verzweigung (optional)
  A --> Z{Ist es ein Notfall?}
  Z -- Ja --> Z1[Notfall-Flow: Nur Seeker=paid + Screening=passed<br/>Sofort-Alarm + Bestätigungsdialog] --> I
  Z -- Nein --> B
