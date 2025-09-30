import { useEffect } from 'react';
import { getCategoryById } from '../config/serviceCategories';
import speech from '../services/speechService';

export default function CategoryVoiceHint({ categoryId }: { categoryId: string }) {
  useEffect(() => {
    const cat = getCategoryById(categoryId);
    if (!cat) return;
    if (cat.requiresScreeningPassed) {
      speech.speak('Für diese Kategorie ist ein bestandener Wesenstest erforderlich.');
    }
  }, [categoryId]);
  return null;
}
