// /frontend/src/utils/categoryEligibility.js
import { getCategoryById } from '../config/serviceCategories';

// user: { userType, seekerRole, helperRole, screeningStatus }
export function canUserPostCategory(user, categoryId) {
  const cat = getCategoryById(categoryId);
  if (!cat) return false;
  if (cat.requiresScreeningPassed && user?.screeningStatus !== 'passed') return false;
  if (!cat.allowedSeekerRoles?.includes(user?.seekerRole)) return false;
  return true;
}

export function canUserTakeCategory(user, categoryId) {
  const cat = getCategoryById(categoryId);
  if (!cat) return false;
  if (cat.requiresScreeningPassed && user?.screeningStatus !== 'passed') return false;
  if (!cat.allowedHelperRoles?.includes(user?.helperRole)) return false;
  return true;
}