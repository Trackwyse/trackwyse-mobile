interface User {
  id: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  email: string;
  createdAt: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AddLabelInput {
  id: string;
}

interface Register2Input extends RegisterInput {
  firstName?: string;
  lastName?: string;
}

interface VerifyInput {
  verificationToken: string;
}

interface LoginAPIResponse {
  data: {
    error: boolean;
    message: string;
    accessToken: string;
  };
}

interface RegisterAPIResponse {
  data: {
    error: boolean;
    message: string;
    accessToken: string;
  };
}

interface UserAPIResponse {
  data: {
    error: boolean;
    message: string;
    user: User;
  };
}

interface CheckEmailAPIResponse {
  data: {
    error: boolean;
    message: string;
    emailInUse: boolean;
  };
}

interface VerifyEmailAPIResponse {
  data: {
    error: boolean;
    message: string;
  };
}

interface ReverifyEmailAPIResponse {
  data: {
    error: boolean;
    message: string;
  };
}

interface AddLabelAPIResponse {
  data: {
    error: boolean;
    message: string;
  };
}
