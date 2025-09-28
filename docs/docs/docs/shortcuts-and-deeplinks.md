# Shortcuts & Deep-Links

Diese App unterstützt Deep-Links, um über Siri/Google Assistant direkt in kritische Flows zu springen.

## Aktionen (Query-Parameter)
- `?action=emergency` – öffnet den Notfall-Dialog
- `?action=new_job&dictate=true` – öffnet das Job-Formular und startet Vorlesen/Diktat
- `?action=read_messages` – öffnet Nachrichtenansicht und liest neue Nachrichten vor

## Verwendung
- iOS: Siri-Kurzbefehl mit „URL“ + „URL öffnen“
- Android: Homescreen-Shortcut/Assistant-Routine mit der URL
- PWA/Browser: Direktaufruf als Lesezeichen

## Router-Integration
- Beim App-Start Query-Parameter lesen, Aktion ausführen (siehe Beispiel in README/Code).
- Sicherheitsbestätigung für `emergency` anzeigen.

## Barrierefreiheit
- TTS erklärt jeden Schritt.
- Große Buttons, klare Labels, kein Tech-Jargon.
