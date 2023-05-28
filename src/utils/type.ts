export enum CardNetworkType {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
}

export enum SubscriptionTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
}

export enum CurrencyType {
  USD = "USD",
  USDC = "USDC",
}

export interface IDbUser {
  id: string;
  address: string;
  subscriptionId: string | null;
  cardId: string[];
  circleWalletId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDbUserSubscription {
  subscriptionId: string;
  active: boolean;
  tier: SubscriptionTier;
  currency: CurrencyType;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDbUserCardInfo {
  cardId: string;
  circleCardId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExtendedCardInfo {
  cardId: string;
  circleCardId: string;
  active: boolean;
  last4: string;
  expMonth: number;
  expYear: number;
  network: CardNetworkType;
}
