interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface ResetPasswordInput {
  email: string;
  password: string;
  confirmPassword: string;
  resetToken: string;
}

interface AddLabelInput {
  id: string;
}

interface DeleteLabelInput {
  id: string;
}

interface RecoverLabelInput {
  id: string;
}

interface VerifyInput {
  verificationToken: string;
}

interface CreateSubscriptionInput {
  receipt: string;
}

interface ModifyLabelInput {
  id?: string;
  name?: string;
  color?: number;
  message?: string;
  phoneNumber?: string;
}

interface FoundLabelDetailsInput {
  id?: string;
  phoneNumber?: string;
  exactLocation?: AddressInput;
  recoveryLocation?: AddressInput;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  notificationPushToken?: string;
  notificationsEnabled?: "true" | "false";
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip5?: string;
}

interface UpdateUserPasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AddressInput {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip5?: string;
}

interface GetDistanceInput {
  origin: string;
  destination: string;
}
