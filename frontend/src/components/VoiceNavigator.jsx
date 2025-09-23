import React, { useState } from 'react';
import { SpeechService } from '../services/speechService';

const speech = new SpeechService();

export default function VoiceNavigator({ onCommand }) {
  const [listening, setListening] = useState(false);
  const start = () => {
    setListening(true);
    speech.startRecognition(
      (text) => {
        setListening(false);
        // simple command parsing
        const normalized = text.toLowerCase();
        if (normalized.includes('helfer') || normalized.includes('find helper') || normalized.includes('shopping')) {
          onCommand({ action: 'search', category: 'shopping' });
          speech.speak('Ich suche Helfer für Einkauf in Ihrer Nähe.');
        } else if (normalized.includes('poste') || normalized.includes('job')) {
          onCommand({ action: 'post_job' });
          speech.speak('Ok, Job erstellen. Bitte beschreiben Sie die Aufgabe.');
        } else if (normalized.includes('nachrichten') || normalized.includes('messages')) {
          onCommand({ action: 'open_messages' });
          speech.speak('Ich lese Ihre Nachrichten vor.');
        } else {
          speech.speak('Ich habe das nicht verstanden. Bitte wiederholen.');
        }
      },
      (err) => {
        setListening(false);
        speech.speak('Die Spracherkennung ist fehlgeschlagen.');
        console.error(err);
      }
    );
  };

  return (
    <div role="region" aria-label="Voice navigation">
      <button
        onClick={start}
        aria-pressed={listening}
        style={{ minHeight: 60, minWidth: 160, fontSize: 18 }}
        className="large-button"
      >
        {listening ? 'Listening...' : 'Voice Command'}
      </button>
    </div>
  );
}
