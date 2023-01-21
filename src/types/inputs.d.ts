/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

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

interface AddLabelInput extends AccessToken {
  id: string;
}

interface DeleteLabelInput extends AccessToken {
  id: string;
}

interface RecoverLabelInput extends AccessToken {
  id: string;
}

interface VerifyInput extends AccessToken {
  verificationToken: string;
}

interface CreateSubscriptionInput extends AccessToken {
  receipt: string;
}

interface ModifyLabelInput extends AccessToken {
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

interface UpdateUserInput extends AccessToken {
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

interface DeleteUserAccountInput extends AccessToken {
  password: string;
}

interface UpdateUserPasswordInput extends AccessToken {
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

interface GetDistanceInput extends AccessToken {
  origin: string;
  destination: string;
}

interface SetPremiumInput extends AccessToken {
  id: string;
  expiresIn?: number;
}

interface GetUserTransactionsInput extends AccessToken {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

interface GetUserTransactionInput extends AccessToken {
  id: string;
}
