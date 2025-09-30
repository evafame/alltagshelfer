// /frontend/src/components/CategoryVoiceHint.jsx
import { getCategoryById } from '../config/serviceCategories';
import speech from '../services/speechService';
import { useEffect } from 'react';

export default function CategoryVoiceHint({ categoryId }) {
  useEffect(() => {
    const cat = getCategoryById(categoryId);
    if (!cat) return;
    if (cat.requiresScreeningPassed) {
      speech.speak('Für diese Kategorie ist ein bestandener Wesenstest erforderlich.');
    }
  }, [categoryId]);
  return null;
}
