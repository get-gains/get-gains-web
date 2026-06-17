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
  totalRedeemed: number;
}

export interface EngagementAnalytics {
  workoutsCompletedThisPeriod: number;
  avgWorkoutsPerUserThisPeriod: number;
}

export interface EngagementSeriesPoint {
  date: string;
  workoutsCompleted: number;
  avgWorkoutsPerUser: number;
}

export interface UserSeriesPoint {
  date: string;
  newUsers: number;
  cumulativeUsers: number;
}

export interface CoachSeriesPoint {
  date: string;
  newCoaches: number;
  cumulativeCoaches: number;
}

export interface InvitationSeriesPoint {
  date: string;
  redeemedInvites: number;
}

export interface AnalyticsResponse {
  period: AnalyticsPeriod;
  coaches: CoachAnalytics;
  users: UserAnalytics;
  invitations: InvitationAnalytics;
  engagement: EngagementAnalytics;
  engagementSeries: EngagementSeriesPoint[];
  userSeries: UserSeriesPoint[];
  coachSeries: CoachSeriesPoint[];
  invitationSeries: InvitationSeriesPoint[];
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

export type RewardType = "COINS" | "RAFFLE" | "COUPON";

export type CosmeticCategory = "HEADWEAR" | "TOP" | "BOTTOM" | "ACCESSORY";

export type CosmeticStatus = "ACTIVE" | "INACTIVE";

export interface MissionPartnerSummary {
  id: string;
  name: string;
  logoKey: string;
}

export interface MissionCoupon {
  id: string;
  offerTag: string;
  description: string | null;
  discountPercent: number;
}

export interface Mission {
  id: string;
  partnerId: string | null;
  title: string;
  description: string;
  goalType: string;
  goalToReach: number;
  rewardType: RewardType;
  rewardCoins: number;
  rewardTitle: string | null;
  rewardDescription: string | null;
  rewardImageKey: string | null;
  maxWinners: number | null;
  isRepeatable: boolean;
  isClosed: boolean;
  startsAt: string | null;
  endsAt: string | null;
  partner: MissionPartnerSummary | null;
  coupon: MissionCoupon | null;
  stats: {
    completions: number;
    winners: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logoKey: string;
  bio: string;
  socialLinks: string[];
  missionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cosmetic {
  id: string;
  name: string;
  description: string;
  tier: number;
  price: number;
  previewImageKey: string;
  unityAssetRef: string;
  category: CosmeticCategory;
  status: CosmeticStatus;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
