import { SubscriptionTier } from "@prisma/client";

export const SubscriptionPlans = {
  [SubscriptionTier.BRONZE]: {
    tier: SubscriptionTier.BRONZE,
    description: ["Github: Starred Repositories"],
    price: 1.1,
  },
  [SubscriptionTier.SILVER]: {
    tier: SubscriptionTier.SILVER,
    description: ["Github: Starred Repositories", "Github: Sponsors"],
    price: 2.2,
  },
  [SubscriptionTier.GOLD]: {
    tier: SubscriptionTier.GOLD,
    description: [
      "Github: Starred Repositories",
      "Github: Sponsors",
      "Twitter: Beta Version",
    ],
    price: 3.3,
  },
};
