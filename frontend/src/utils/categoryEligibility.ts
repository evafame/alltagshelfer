import type { User } from '../types';
import { getCategoryById } from '../config/serviceCategories';

export function canUserPostCategory(user: User | null | undefined, categoryId: string): boolean {
  const cat = getCategoryById(categoryId);
  if (!cat || !user) return false;
  if (cat.requiresScreeningPassed && user.screeningStatus !== 'passed') return false;
  if (!cat.allowedSeekerRoles.includes(user.seekerRole ?? 'free_basic')) return false;
  return true;
}

export function canUserTakeCategory(user: User | null | undefined, categoryId: string): boolean {
  const cat = getCategoryById(categoryId);
  if (!cat || !user) return false;
  if (cat.requiresScreeningPassed && user.screeningStatus !== 'passed') return false;
  if (!cat.allowedHelperRoles.includes(user.helperRole ?? 'free_volunteer')) return false;
  return true;
}
