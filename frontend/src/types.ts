export type UserType = 'helper' | 'seeker' | 'both';
export type HelperRole = 'paid' | 'free_volunteer';
export type SeekerRole = 'paid' | 'free_basic';
export type ScreeningStatus = 'pending' | 'passed' | 'failed';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  helperRole?: HelperRole;
  seekerRole?: SeekerRole;
  screeningStatus?: ScreeningStatus;
  screeningScore?: number | null;
}

export type JobStatus = 'posted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  title: string;
  serviceCategory: string; // IDs aus SERVICE_CATEGORIES
  status: JobStatus;
  seekerId: string;
  helperId?: string | null;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  examples: string[];
  voicePhrases: string[];
  allowedSeekerRoles: SeekerRole[];
  allowedHelperRoles: HelperRole[];
  requiresScreeningPassed: boolean;
}
