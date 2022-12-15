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

interface AddLabelInput {
  id: string;
}

interface DeleteLabelInput {
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