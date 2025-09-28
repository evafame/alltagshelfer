# Dialog-Flow: Job-Anfrage (Voice-first)

Dieses Dokument beschreibt den Beispiel-Dialog zwischen Hilfesuchendem, Assistentin „Eva“ und einer potentiellen Helferin.

---

## Szenario A – Helfer verfügbar („Ja-Fall“)

**Seeker:**  
„Hallo, Eva, ich brauche unbedingt Hilfe beim Einkaufen. Gibt es jemand in der Nähe, der jetzt Zeit hat?“

**Eva (Assistentin):**  
„Ja, Sarah wohnt von hier 5 Minuten entfernt. Sie hat ein Goldabzeichen und arbeitet gerne mit alten Menschen. Soll ich dir ihr Profil zeigen?“

**Seeker:**  
„Ja. Sag mir auch, wie viel sie für das Einkaufen verlangt.“

**Eva:**  
- Profil wird dargestellt (Name, Badge, Distanz, Spezialisierung, Rate).  
„Sarah verlangt 12 Euro pro Stunde. Möchtest du, dass sie dir hilft?“

**Seeker:**  
„Ja, sie soll mir helfen. Kann sie in zwei Stunden hier sein? Es ist dringend. Ich brauch unbedingt Eier und Milch.“

**Eva:**  
„Ja, sie kann in zwei Stunden hier sein. Soll ich ihr gleich den Einkaufszettel mitteilen?“

**Seeker:**  
„Ja, bitte. Ich brauche auch noch Hilfe beim Küche aufräumen. Könnte sie mir hier auch helfen?“

**Eva:**  
„Ja, sie kann. Ich schicke ihr die Anfrage. Soll ich die Zahlung gleich tätigen oder erst nachdem sie da war?“

**Seeker:**  
„Gerne gleich. Damit sie wieder kommt, falls sie gut ist.“

---

## Szenario B – Kein Helfer sofort verfügbar („Nein-Fall“)

**Seeker:**  
„Hallo, Eva, ich brauche dringend Hilfe beim Einkaufen. Gibt es jemand in der Nähe, der jetzt Zeit hat?“

**Eva:**  
„Nein, leider nicht direkt in der Nähe. Ich könnte einen Lieferdienst bestellen, aber der wäre erst in 4 Stunden da.“

**Seeker:**  
„Nein, bitte such jemand anderes. Gerne auch mit Anfahrt. Ich übernehme die Reisekosten.“

**Eva:**  
„Okay, ich schaue gleich nach. Susanne könnte in zwei Stunden hier sein.“

**Seeker:**  
„Oh, hervorragend. Sie soll mir danach auch beim Aufräumen der Küche helfen.“

**Eva:**  
„Ich frage an. Susanne kann leider nicht beim Aufräumen bleiben, aber sie könnte gegen Nachmittag für 2 Stunden kommen. Möchtest du das annehmen?“

**Seeker:**  
„Okay, dann machen wir es so. Soll ich sie gleich bezahlen oder erst nachdem sie da war?“

**Eva:**  
„Lieber erst nachdem sie da war.“  
„Okay, Anfrage ist gestellt.“

---

## Kernelemente (Umsetzung)

- **Matching:** System sucht Helfer:innen nach Radius, Availability, Skills.  
- **Profilanzeige:** Distanz, Badge, Spezialisierung, Stundenrate.  
- **Zeitauswahl:** sofort / 2 Stunden / später.  
- **Zusatzdienste:** weitere Aufgaben (z. B. Küche aufräumen) können angefragt werden.  
- **Fallback:** Alternativen vorschlagen (Lieferdienst, andere Helfer mit Anfahrt, andere Uhrzeit).  
- **Zahlung:** Wahl zwischen „vorab“ (Escrow) oder „nachher“ (Release).  
- **Audio-first:** Jede Aktion wird vorgelesen und kann per Ja/Nein bestätigt werden.  

---
