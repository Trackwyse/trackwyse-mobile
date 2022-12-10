interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Register2Input {
  firstName: string;
  lastName: string;
}

interface Register3Input {
  verificationCode: string;
}

interface LoginAPIResponse {
  error: boolean;
  message: string;
  accessToken: string;
}