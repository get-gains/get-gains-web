export interface AdminUser {
  supabase_auth_id: string;
  email: string;
  full_name: string;
}

export interface AnalyticsPeriod {
  days: number;
  start: string;
  end: string;
}

export interface CoachAnalytics {
  total: number;
  active: number;
  deactivated: number;
  onboardedThisPeriod: number;
  avgClientsPerCoach: number;
  top5ByClientWorkouts: Array<{
    coachId: string;
    fullName: string;
    email: string;
    workouts: number;
  }>;
}

export interface UserAnalytics {
  total: number;
  newThisPeriod: number;
  subscribed: number;
  free: number;
  subscribedWithCoach: number;
  subscribedWithoutCoach: number;
  subscribedWithProgram: number;
  subscribedWithoutProgram: number;
}

export interface InvitationAnalytics {
  pending: number;
  revoked: number;
  redeemedThisPeriod: number;
}

export interface EngagementAnalytics {
  workoutsCompletedThisPeriod: number;
  avgWorkoutsPerUserThisPeriod: number;
}

export interface AnalyticsResponse {
  period: AnalyticsPeriod;
  coaches: CoachAnalytics;
  users: UserAnalytics;
  invitations: InvitationAnalytics;
  engagement: EngagementAnalytics;
}

export interface CoachAdminListItem {
  userId: string;
  email: string;
  fullName: string;
  avatarKey: string | null;
  isCoach: boolean;
  yearsExperience: number | null;
  activeClients: number;
  maxClients: number;
  acceptingClients: boolean;
  isDiscoverable: boolean;
  deactivatedAt: string | null;
  status: "active" | "deactivated";
  createdAt: string;
}

export interface InvitationListItem {
  id: string;
  email: string;
  code: string;
  status: "PENDING" | "REDEEMED" | "REVOKED";
  attempts: number;
  maxAttempts: number;
  expiresAt: string;
  createdBy: { email: string; fullName: string } | null;
  redeemedBy: { email: string; fullName: string } | null;
  redeemedAt: string | null;
  revokedBy: { email: string; fullName: string } | null;
  revokedAt: string | null;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  [key: string]:
    | T[]
    | { total: number; limit: number; offset: number; hasMore: boolean };
}
