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

interface GetLabelInput {
  id: string;
}

interface VerifyInput {
  verificationToken: string;
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
  exactLocation?: string;
  recoveryLocation?: string;
}
