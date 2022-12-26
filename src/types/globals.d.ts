interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  termsAccepted: boolean;
  notificationsEnabled: boolean;
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
  foundExactLocation?: string; // Exact location of where the label was, if user provided it
  foundRecoveryLocation?: string; // Where the user can recover the label, if user provided it
  foundRecoveryPossible?: boolean; // If the user can recover the label
  finderPhoneNumber?: string; // Phone number of the person who found the label

  createdAt?: Date;
  updatedAt?: Date;
}

interface Color {
  bg: string;
  borderSelected: string;
  borderUnselected: string;
}
