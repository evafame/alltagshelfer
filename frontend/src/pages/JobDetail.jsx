// /frontend/src/pages/JobDetail.jsx
import React from 'react';
import { canUserTakeCategory } from '../utils/categoryEligibility';
import speech from '../services/speechService';

export default function JobDetail({ currentUser, job }) {
  if (!job) return <p>Lade Job…</p>;

  const eligible = canUserTakeCategory(currentUser, job.serviceCategory);

  const assignJob = async () => {
    const res = await fetch(`/api/jobs/${job.id}/assign`, { method: 'POST' });
    if (res.ok) {
      speech.speak('Job übernommen. Viel Erfolg!');
    } else {
      speech.speak('Job konnte nicht übernommen werden.');
    }
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>{job.title}</h1>
      <p>Kategorie: {job.serviceCategory}</p>
      <p>Status: {job.status}</p>

      <button
        disabled={!eligible}
        onClick={assignJob}
        style={{ minHeight: 48, padding:'12px 16px' }}
        title={!eligible ? 'Nicht zulässig für Ihre Rolle/Screening' : 'Job übernehmen'}
      >
        Job übernehmen
      </button>
    </main>
  );
}
