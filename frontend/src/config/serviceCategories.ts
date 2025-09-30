import type { ServiceCategory } from '../types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'shopping',
    label: 'Einkaufen & Besorgungen',
    icon: '🛒',
    description: 'Lebensmittel, Apotheke, Post — kleine Erledigungen in der Nähe.',
    examples: ['Eier & Milch holen', 'Medikamente abholen', 'Paket abgeben'],
    voicePhrases: ['Einkauf', 'Besorgung', 'Grocery', 'Pharmacy'],
    allowedSeekerRoles: ['paid', 'free_basic'],
    allowedHelperRoles: ['paid', 'free_volunteer'],
    requiresScreeningPassed: false
  },
  {
    id: 'household',
    label: 'Haushaltshilfe',
    icon: '🏠',
    description: 'Aufräumen, Küche, Wäsche, leichtes Putzen.',
    examples: ['Küche aufräumen', 'Wäsche aufhängen', 'Boden wischen'],
    voicePhrases: ['Haushalt', 'Küche', 'Putzen', 'Aufräumen'],
    allowedSeekerRoles: ['paid', 'free_basic'],
    allowedHelperRoles: ['paid', 'free_volunteer'],
    requiresScreeningPassed: false
  },
  {
    id: 'companionship',
    label: 'Gesellschaft & Betreuung',
    icon: '🤝',
    description: 'Gespräch, Lesen, Spiele, Spaziergang — Zeit gemeinsam verbringen.',
    examples: ['Spazieren gehen', 'Vorlesen', 'Brettspiel spielen'],
    voicePhrases: ['Gesellschaft', 'Betreuung', 'Plaudern', 'Vorlesen'],
    allowedSeekerRoles: ['paid', 'free_basic'],
    allowedHelperRoles: ['paid', 'free_volunteer'],
    requiresScreeningPassed: false
  },
  {
    id: 'gardening',
    label: 'Gartenhilfe',
    icon: '🌿',
    description: 'Gießen, leichte Gartenarbeit, Pflanzenpflege.',
    examples: ['Pflanzen gießen', 'Laub kehren', 'Kräuter umtopfen'],
    voicePhrases: ['Garten', 'Pflanzen', 'Gießen'],
    allowedSeekerRoles: ['paid', 'free_basic'],
    allowedHelperRoles: ['paid', 'free_volunteer'],
    requiresScreeningPassed: false
  },
  {
    id: 'tech',
    label: 'Technikhilfe',
    icon: '📱',
    description: 'Smartphone/PC einrichten, WLAN, Apps erklären.',
    examples: ['Neues Handy einrichten', 'WLAN hilft nicht', 'E-Mail einrichten'],
    voicePhrases: ['Technik', 'Handy', 'WLAN', 'Computer'],
    allowedSeekerRoles: ['paid', 'free_basic'],
    allowedHelperRoles: ['paid', 'free_volunteer'],
    requiresScreeningPassed: false
  },
  {
    id: 'transport',
    label: 'Begleitung & Fahrten*',
    icon: '🚗',
    description: 'Begleitung zu Arzt/Einkauf. *Rechtliche Rahmenbedingungen lokal prüfen.',
    examples: ['Begleitung zum Arzt', 'Fahrt zum Supermarkt'],
    voicePhrases: ['Begleitung', 'Fahrt', 'Arzttermin'],
    allowedSeekerRoles: ['paid'],
    allowedHelperRoles: ['paid'],
    requiresScreeningPassed: false
  },
  {
    id: 'dementia_companion',
    label: 'Demenzbegleitung (spezial)',
    icon: '🧠',
    description: 'Ruhige, strukturierte Begleitung. Nur für spezialisierte Helfer:innen.',
    examples: ['Routinen begleiten', 'Gedächtnisübungen', 'Sicherheit zu Hause'],
    voicePhrases: ['Demenz', 'Begleitung Demenz'],
    allowedSeekerRoles: ['paid'],
    allowedHelperRoles: ['paid'],
    requiresScreeningPassed: true
  },
  {
    id: 'night_care',
    label: 'Nachtschicht',
    icon: '🌙',
    description: 'Anwesenheit/Unterstützung während der Nacht.',
    examples: ['Nachtwache', 'Nächtliche Begleitung'],
    voicePhrases: ['Nachtschicht', 'Nachtbetreuung'],
    allowedSeekerRoles: ['paid'],
    allowedHelperRoles: ['paid'],
    requiresScreeningPassed: true
  },
  {
    id: 'emergency',
    label: 'Notfall',
    icon: '🚨',
    description: 'Dringende Hilfe jetzt; nur für freigeschaltete Accounts.',
    examples: ['Jetzt Hilfe!', 'Akut einkaufen', 'Sofortige Begleitung'],
    voicePhrases: ['Notfall', 'Soforthilfe', 'Dringend'],
    allowedSeekerRoles: ['paid'],
    allowedHelperRoles: ['paid'],
    requiresScreeningPassed: true
  }
];

export const CATEGORY_HINTS = {
  requiresScreening: 'Für diese Kategorie ist ein bestandener Wesenstest erforderlich.',
  paidOnlySeeker: 'Diese Aufgabe erfordert eine zahlende Seeker-Rolle.',
  paidOnlyHelper: 'Diese Aufgabe kann nur von bezahlten Helfer:innen übernommen werden.'
} as const;

export function getCategoryById(id: string) {
  return SERVICE_CATEGORIES.find(c => c.id === id);
}

export function listPublicCategories() {
  return SERVICE_CATEGORIES;
}
