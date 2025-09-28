// /frontend/src/components/EmergencyButton.jsx
import React, { useState, useEffect } from 'react';
import speech from '../services/speechService';

function isEmergencyEnabled() {
  // Optional: per ENV ins Frontend geben, hier einfacher Fallback
  // In echten Setups über Config oder Build-Time-Env
  return true; // FEATURE_EMERGENCY_ENABLED
}

/**
 * props:
 * - user: { userType, seekerRole, screeningStatus }
 * - onCreateEmergency: async () => Promise<void>  // ruft API zum Anlegen eines Emergency-Jobs
 */
export default function EmergencyButton({ user, onCreateEmergency }) {
  const [allowed, setAllowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    const ok =
      isEmergencyEnabled() &&
      user?.userType && user.userType.toLowerCase() !== 'helper' && // muss Seeker oder both sein
      (user?.seekerRole === 'paid') &&
      (user?.screeningStatus === 'passed');

    setAllowed(!!ok);
  }, [user]);

  if (!allowed) {
    // Optional: Statt nichts zu zeigen, erklärend Hinweis rendern:
    return (
      <p role="status" aria-live="polite" style={{ fontSize: 14 }}>
        Notfallfunktion verfügbar, sobald <strong>Seeker-Rolle: Paid</strong> gesetzt
        und der <strong>Wesenstest bestanden</strong> ist.
      </p>
    );
  }

  const handleClick = async () => {
    try {
      setSubmitting(true);
      setAnnounce('Notfall wird erstellt. Bitte warten.');
      speech.speak('Notfall wird erstellt. Bitte warten.');
      await onCreateEmergency?.(); // sollte einen Job mit urgency="emergency" anlegen
      setAnnounce('Notfall wurde angelegt. Helfer werden benachrichtigt.');
      speech.speak('Notfall wurde angelegt. Helfer werden benachrichtigt.');
    } catch (e) {
      setAnnounce('Fehler beim Anlegen des Notfalls. Bitte erneut versuchen.');
      speech.speak('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div aria-live="polite" style={{ position: 'absolute', left: -9999 }}>{announce}</div>

      <button
        onClick={handleClick}
        disabled={submitting}
        aria-label="Notfall auslösen"
        title="Notfall auslösen"
        style={{
          minHeight: 64,
          minWidth: 220,
          borderRadius: 16,
          fontSize: 18,
          padding: '16px 20px',
          border: 'none',
          cursor: 'pointer',
          background: submitting ? '#b0b0b0' : '#d32f2f',
          color: '#ffffff'
        }}
      >
        {submitting ? 'Wird gesendet…' : '🚨 Notfall-Hilfe anfordern'}
      </button>

      <p style={{ marginTop: 8, fontSize: 14 }}>
        Bei unmittelbarer Gefahr immer zuerst den <strong>Notruf 112</strong> wählen.
      </p>
    </div>
  );
}
