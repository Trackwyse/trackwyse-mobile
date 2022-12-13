interface User {
  id: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  email: string;
  createdAt: string;
}

interface Label {
  id: string;
  activated: boolean;
  isLost: boolean;

  name?: string;
  color?: string;
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

interface GetLabelsAPIResponse {
  data: {
    error: boolean;
    message: string;
    labels: Label[];
  };
}
