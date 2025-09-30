// /frontend/src/pages/JobCreate.jsx
import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../config/serviceCategories';
import { canUserPostCategory } from '../utils/categoryEligibility';
import speech from '../services/speechService';

export default function JobCreate({ currentUser }) {
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState('');

  const handleSelect = (catId) => {
    setCategory(catId);
    const picked = SERVICE_CATEGORIES.find(c => c.id === catId);
    if (picked) speech.speak(`Kategorie ${picked.label} ausgewählt.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return;
    // Minimaler Submit (an deine API anpassen)
    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, serviceCategory: category })
    }).then(r => {
      if (!r.ok) throw new Error('Job erstellen fehlgeschlagen');
      speech.speak('Auftrag wurde erstellt.');
    }).catch(() => speech.speak('Fehler beim Erstellen des Auftrags.'));
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Neuen Auftrag erstellen</h1>

      <label style={{ display:'block', margin:'12px 0 8px' }}>Titel / Kurzbeschreibung</label>
      <input
        value={title}
        onChange={e=>setTitle(e.target.value)}
        placeholder="z. B. Einkauf: Eier & Milch"
        style={{ width:'100%', maxWidth:540, padding:12, fontSize:16 }}
      />

      <h2 style={{ margin:'24px 0 8px' }}>Kategorie wählen</h2>
      <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {SERVICE_CATEGORIES.map(cat => {
          const disabled = !canUserPostCategory(currentUser, cat.id);
          return (
            <button
              key={cat.id}
              disabled={disabled}
              onClick={() => !disabled && handleSelect(cat.id)}
              title={disabled ? 'Nicht verfügbar für Ihre Rolle/Screening' : ''}
              style={{
                minHeight: 60, padding: 12, borderRadius: 12, textAlign:'left',
                border: '1px solid #e0e0e0', background: disabled ? '#f3f3f3' : '#fff',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            >
              <div style={{ fontSize: 22 }}>{cat.icon} {cat.label}</div>
              <div style={{ fontSize: 13, color:'#555' }}>{cat.description}</div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleSubmit} disabled={!category || !title} style={{ minHeight: 48, padding:'12px 16px' }}>
          Auftrag veröffentlichen
        </button>
      </div>
    </main>
  );
}
