import axios from "axios";

const baseURL = __DEV__ ? "https://api.dev.trackwyse.com" : "https://api.trackwyse.com";

// Base API Client
const apiClient = axios.create({
  baseURL,
});

/*
  GET /status/valid-clients

  Response Body:
    - error: boolean
    - message: string
    - versions: string[]
*/
const getValidClients = (): Promise<ValidClientsAPIResponse> => {
  return apiClient.get("/status/valid-clients");
};

/*
  POST /auth/v1/login

  Request Body:
    - email: string
    - password: string

  Response Body:
    - error: boolean
    - message: string
    - accessToken: string
*/
const login = (values: LoginInput): Promise<LoginAPIResponse> => {
  const { email, password } = values;

  return apiClient.post("/auth/v1/login", {
    email,
    password,
  });
};

/*
  POST /auth/v1/logout
*/
const logout = (accessToken: string): Promise<LogoutAPIResponse> => {
  return apiClient.post(
    "/auth/v1/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/register

  Request Body:
    - email: string
    - password: string
    - firstName: string
    - lastName: string

  Response Body:
    - error: boolean
    - message: string
    - accessToken: string
*/
const register = (value: RegisterInput): Promise<RegisterAPIResponse> => {
  const { email, password, firstName, lastName } = value;

  return apiClient.post("/auth/v1/register", {
    email,
    password,
    firstName,
    lastName,
  });
};

/*
  POST /auth/v1/verify

  Request Body:
    - verificationToken: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const verifyEmail = (values: VerifyInput, accessToken: string): Promise<VerifyEmailAPIResponse> => {
  const { verificationToken } = values;

  return apiClient.post(
    "/auth/v1/verify",
    { verificationToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/reverify

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const reverifyEmail = (accessToken: string): Promise<ReverifyEmailAPIResponse> => {
  return apiClient.post(
    "/auth/v1/reverify",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/refresh

  Response Body:
    - error: boolean
    - message: string
    - accessToken: string
*/
const refreshAccessToken = (refreshToken: string): Promise<RefreshAccessTokenAPIResponse> => {
  return apiClient.post(
    "/auth/v1/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/check-email

  Request Body:
    - email: string

  Response Body:
    - error: boolean
    - message: string
    - emailInUse: boolean
*/
const checkEmail = (values: RegisterInput): Promise<CheckEmailAPIResponse> => {
  const { email } = values;

  return apiClient.post("/auth/v1/check-email", {
    email,
  });
};

/*
  GET /auth/v1/me

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - user: User
*/
const getUser = (accessToken: string): Promise<UserAPIResponse> => {
  return apiClient.get("/api/v1/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/*
  POST /api/v1/labels/add/:id

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const addLabel = (values: AddLabelInput, accessToken: string): Promise<AddLabelAPIResponse> => {
  const { id } = values;

  return apiClient.post(
    `/api/v1/labels/add/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  GET /api/v1/labels

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - labels: Label[]
*/
const getLabels = (accessToken: string): Promise<GetLabelsAPIResponse> => {
  return apiClient.get("/api/v1/labels", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/*
  PATCH /api/v1/labels/modify/:id

  Request Body:
    - labelName: string
    - labelColor: string
    - labelMessage: string
    - phoneNumber: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const modifyLabel = (
  values: ModifyLabelInput,
  accessToken: string
): Promise<ModifyLabelAPIResponse> => {
  const { id, name, color, message, phoneNumber } = values;

  return apiClient.patch(
    `/api/v1/labels/modify/${id}`,
    {
      labelName: name,
      labelColor: color,
      labelMessage: message,
      phoneNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  DELETE /api/v1/labels/delete/:id

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const deleteLabel = (
  values: DeleteLabelInput,
  accessToken: string
): Promise<DeleteLabelAPIResponse> => {
  const { id } = values;

  return apiClient.delete(`/api/v1/labels/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/*
  POST /api/v1/labels/found/:id

  Request Body:
    - phoneNumber: string
    - recoveryLocation: string
    - exactLocation: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const updateFoundLabelDetails = (
  values: FoundLabelDetailsInput,
  accessToken: string
): Promise<FoundLabelDetailsAPIResponse> => {
  const { id, phoneNumber, recoveryLocation, exactLocation } = values;

  return apiClient.post(
    `/api/v1/labels/found/${id}`,
    {
      phoneNumber,
      recoveryLocation,
      exactLocation,
    },
    {
      // In Production, the Authorization header is required
      // In Development, the Authorization header should not be included
      headers: {
        Authorization: !__DEV__ ? `Bearer ${accessToken}` : undefined,
      },
    }
  );
};

/*
  POST /auth/v1/accept-terms

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string 
*/
const acceptTerms = (accessToken: string): Promise<AcceptTermsAPIResponse> => {
  return apiClient.post(
    "/auth/v1/accept-terms",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/forgot

  Request Body:
    - email: string
    
  Response Body:
    - error: boolean
    - message: string
*/
const forgotPassword = (values: ForgotPasswordInput): Promise<ForgotPasswordAPIResponse> => {
  const { email } = values;

  return apiClient.post("/auth/v1/forgot", {
    email,
  });
};

/*
  POST /auth/v1/reset

  Request Body:
    - password: string
    - email: string
    - resetToken: string

  Response Body:
    - error: boolean
    - message: string
*/
const resetPassword = (values: ResetPasswordInput): Promise<ResetPasswordAPIResponse> => {
  const { password, email, resetToken } = values;

  return apiClient.post("/auth/v1/reset", {
    password,
    email,
    resetToken,
  });
};

/*
  PATCH /api/v1/user/update
  
  Request Body:
    - firstName: string
    - lastName: string
    - email: string
    - notificationsEnabled: 'true' | 'false'
    - notificationPushToken: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - user: User
*/
const updateUser = async (
  values: UpdateUserInput,
  accessToken: string
): Promise<UpdateUserAPIResponse> => {
  return apiClient.patch("/api/v1/user/update", values, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/*
  POST /api/v1/user/update-password

  Request Body:
    - currentPassword: string
    - newPassword: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const updateUserPassword = async (
  values: UpdateUserPasswordInput,
  accessToken: string
): Promise<UpdateUserPasswordAPIResponse> => {
  const { currentPassword, newPassword } = values;

  return apiClient.post(
    "/api/v1/user/update-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /api/v1/labels/recovered/:id

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - label
*/
const recoverLabel = async (
  values: RecoverLabelInput,
  accessToken: string
): Promise<RecoverLabelAPIResponse> => {
  const { id } = values;

  return apiClient.post(
    `/api/v1/labels/recovered/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  GET /api/v1/subscription

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - subscriptionActive: boolean
    - subscriptionDate: string
    - subscriptionReceipt: string
*/
const getSubscription = async (accessToken: string): Promise<GetSubscriptionAPIResponse> => {
  return apiClient.get("/api/v1/subscription", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/*
  POST /api/v1/subscription/create

  Request Body:
    - receipt: string

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - user: User
*/
const createSubscription = async (
  values: CreateSubscriptionInput,
  accessToken: string
): Promise<CreateSubscriptionAPIResponse> => {
  const { receipt } = values;

  return apiClient.post(
    "/api/v1/subscription/create",
    {
      receipt,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /api/v1/subscription/claim/free-labels

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
*/
const claimFreeLabels = async (accessToken: string): Promise<ClaimFreeLabelsAPIResponse> => {
  return apiClient.post(
    "/api/v1/subscription/claim/free-labels",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export default {
  getValidClients,

  login,
  logout,
  register,
  acceptTerms,
  forgotPassword,
  resetPassword,
  checkEmail,
  verifyEmail,
  reverifyEmail,
  refreshAccessToken,

  getUser,
  updateUser,
  updateUserPassword,

  addLabel,
  getLabels,
  modifyLabel,
  deleteLabel,
  recoverLabel,
  updateFoundLabelDetails,

  createSubscription,
  getSubscription,
  claimFreeLabels,
};
