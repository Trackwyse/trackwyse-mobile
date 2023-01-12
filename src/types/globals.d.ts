interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: UserAddress;

  verified: boolean;
  termsAccepted: boolean;
  notificationsEnabled: boolean;

  subscriptionActive: boolean;

  labels: Label[];
  createdAt: string;
}

interface Label {
  _id: string;
  owner: string;
  activated: boolean;
  isLost: boolean;

  name?: string;
  color?: Color;
  message?: string;
  phoneNumber?: string;

  foundNear?: string; // Based on IP address
  foundDate?: Date; // When the label was found
  foundExactLocation?: LabelAddress; // Exact location of where the label was, if user provided it
  foundRecoveryLocation?: LabelAddress; // Where the user can recover the label, if user provided it
  foundRecoveryPossible?: boolean; // If the user can recover the label
  finderPhoneNumber?: string; // Phone number of the person who found the label

  createdAt?: Date;
  updatedAt?: Date;
}

interface SubscriptionReceipt {
  bundleId: string;
  productId: string;
  transactionId: string;
  purchaseDate: number;
  quantity: number;
  expirationDate?: number;
  isTrialPeriod?: boolean;
  isIntroOfferPeriod?: boolean;
  environment?: string;
  originalPurchaseDate?: number;
  applicationVersion?: string;
  originalApplicationVersion?: string;
}

interface SubscriptionPerks {
  freeLabelsRedeemed: number;
  freeLabelsLastRedeemed: Date;
  freeLabelsRedeemable: boolean;
  freeLabelsNextRedeemable: Date;

  secureRecoveriesEnabled: boolean;
}

interface Color {
  bg: string;
  borderSelected: string;
  borderUnselected: string;
}

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip5: string;
}

interface UserAddress extends Address {
  isValid: boolean;
}

interface LabelAddress extends Address {
  latitude: number;
  longitude: number;
}

interface Distance {
  destination: {
    latitude: number;
    longitude: number;
  };
  distanceMeters: number;
  expectedTravelTimeSeconds: number;
  staticTravelTimeSeconds: number;
  transportType: "Automobile" | "Transit" | "Walking";
}
