import axios from "axios";

const baseURL  = "https://trackerwind.in-staging.space";

// Base API Client
const apiClient = axios.create({
  baseURL
});

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
  const {verificationToken} = values;

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
  POST /auth/v1/checkEmail

  Request Body:
    - email: string

  Response Body:
    - error: boolean
    - message: string
    - emailInUse: boolean
*/
const checkEmail = (values: RegisterInput): Promise<CheckEmailAPIResponse> => {
  const { email } = values;

  return apiClient.post("/auth/v1/checkEmail", {
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
  return apiClient.get("/auth/v1/me", {
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
const modifyLabel = (values: ModifyLabelInput, accessToken: string): Promise<ModifyLabelAPIResponse> => {
  const { id, name, color, message, phoneNumber } = values;

  return apiClient.patch(
    `/api/v1/labels/modify/${id}`,
    {
      labelName: name,
      labelColor: color,
      labelMessage: message,
      phoneNumber
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
const deleteLabel = (values: DeleteLabelInput, accessToken: string): Promise<DeleteLabelAPIResponse> => {
  const { id } = values;

  return apiClient.delete(
    `/api/v1/labels/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

/*
  POST /auth/v1/acceptTerms

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string 
*/
const acceptTerms = (accessToken: string): Promise<AcceptTermsAPIResponse> => {
  return apiClient.post(
    "/auth/v1/acceptTerms",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};


export default {
  login,
  register,
  getUser,
  acceptTerms,
  checkEmail,
  verifyEmail,
  reverifyEmail,

  addLabel,
  getLabels,
  modifyLabel,
  deleteLabel,
};
