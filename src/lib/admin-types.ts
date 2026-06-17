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
  rewardType: "COINS" | "RAFFLE" | "COUPON";
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

export interface Cosmetic {
  id: string;
  name: string;
  description: string;
  tier: number;
  price: number;
  previewImageKey: string;
  unityAssetRef: string;
  category: "HEADWEAR" | "TOP" | "BOTTOM" | "ACCESSORY";
  status: "ACTIVE" | "INACTIVE";
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}
