// /frontend/src/pages/ShortcutsHelp.jsx
import React, { useEffect, useState } from 'react';
import speech from '../services/speechService';
import { buildDeepLink } from '../utils/deeplink';

// Optional: Passe deine Basis-URL an (prod/dev)
const APP_BASE = typeof window !== 'undefined'
  ? `${window.location.origin}`
  : 'https://alltagshelfer.example';

const tiles = [
  {
    id: 'emergency',
    title: 'Notfall starten',
    description: 'Öffnet sofort den Notfall-Dialog in der App.',
    query: { action: 'emergency' }
  },
  {
    id: 'new_job',
    title: 'Neuen Auftrag diktieren',
    description: 'Springt direkt ins Formular und liest die Schritte vor.',
    query: { action: 'new_job', dictate: 'true' }
  },
  {
    id: 'read_messages',
    title: 'Nachrichten vorlesen',
    description: 'Öffnet die Nachrichtenansicht und liest neue Nachrichten vor.',
    query: { action: 'read_messages' }
  }
];

export default function ShortcutsHelp() {
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    speech.speak('Willkommen bei Schnellzugriffe. Hier können Sie Siri oder Google Kurzbefehle einrichten.');
  }, []);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      speech.speak('Link kopiert. Sie können ihn jetzt als Kurzbefehl verwenden.');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      speech.speak('Kopieren nicht möglich. Bitte den Link manuell auswählen.');
    }
  };

  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Schnellzugriffe (Siri & Google)</h1>
      <p style={{ fontSize: 16, lineHeight: 1.5 }}>
        Mit diesen Links können Sie Sprachbefehle wie „Hey Siri, Notfallhilfe“ oder „Hey Google, öffne Alltagshelfer – neuen Auftrag“ einrichten.
        Tippen Sie auf <strong>Link kopieren</strong> und fügen Sie ihn in Ihren Kurzbefehl ein.
      </p>

      <section aria-label="Schnellzugriffe" style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        {tiles.map(tile => {
          const url = buildDeepLink(APP_BASE, tile.query);
          return (
            <article key={tile.id} style={{
              border: '1px solid #e0e0e0', borderRadius: 12, padding: 16, background: '#fff'
            }}>
              <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>{tile.title}</h2>
              <p style={{ margin: '0 0 12px' }}>{tile.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <code style={{
                  fontSize: 12, background: '#f7f7f7', padding: '8px 10px', borderRadius: 8, wordBreak: 'break-all'
                }}>{url}</code>
                <button
                  onClick={() => copyToClipboard(url, tile.id)}
                  aria-label={`${tile.title} Link kopieren`}
                  style={{
                    minHeight: 48, padding: '12px 16px', borderRadius: 10, border: 'none',
                    background: '#1976d2', color: '#fff', cursor: 'pointer', fontSize: 16
                  }}
                >
                  {copiedId === tile.id ? '✓ Kopiert' : 'Link kopieren'}
                </button>
                <a
                  href={url}
                  aria-label={`${tile.title} jetzt testen`}
                  style={{
                    minHeight: 48, padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
                    background: '#2e7d32', color: '#fff', fontSize: 16
                  }}
                >
                  Jetzt testen
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <hr style={{ margin: '24px 0' }} />

      <section aria-label="Anleitungen" style={{ display: 'grid', gap: 16 }}>
        <div>
          <h3>iPhone / iPad – Siri Kurzbefehl</h3>
          <ol>
            <li>App „Kurzbefehle“ öffnen → „Kurzbefehl erstellen“.</li>
            <li>Aktion „URL“ hinzufügen und den <strong>kopierten Link</strong> einfügen.</li>
            <li>Aktion „URL öffnen“ hinzufügen.</li>
            <li>Kurzbefehl benennen, z. B. „Notfallhilfe“.</li>
            <li>Jetzt sagen: „Hey Siri, Notfallhilfe“.</li>
          </ol>
        </div>
        <div>
          <h3>Android – Google Assistant</h3>
          <ol>
            <li>Homescreen-Verknüpfung/Lesezeichen mit dem <strong>kopierten Link</strong> erstellen.</li>
            <li>Im Assistant sagen: „Hey Google, öffne Alltagshelfer“ (verweist auf PWA).</li>
            <li>Optional: Assistant Routine anlegen, die die PWA-Verknüpfung öffnet.</li>
          </ol>
        </div>
        <div>
          <h3>Smartwatch</h3>
          <p>Nutzen Sie Siri/Assistant auf der Uhr, um die erstellten Kurzbefehle zu starten. Die App öffnet dann auf dem verbundenen Gerät direkt im richtigen Modus.</p>
        </div>
      </section>

      <hr style={{ margin: '24px 0' }} />

      <section aria-label="Sicherheitshinweise">
        <h3>Sicherheit & Datenschutz</h3>
        <ul>
          <li>Notfall öffnet immer einen Bestätigungsdialog in der App (Schutz vor Fehlbedienung).</li>
          <li>Alle Aktionen können protokolliert werden, um Missbrauch zu verhindern.</li>
          <li>Bei akuter Gefahr immer zuerst den Notruf <strong>112</strong> wählen.</li>
        </ul>
      </section>
    </main>
  );
}
