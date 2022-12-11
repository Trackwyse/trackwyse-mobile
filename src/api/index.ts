import axios from "axios";

const endpoint = "https://trackerwind.in-staging.space";

const apiClient = axios.create({
  baseURL: endpoint,
});


const login = ({ email, password }: LoginInput): Promise<LoginAPIResponse> => {
  return apiClient.post("/auth/v1/login", {
    email,
    password,
  });
};

const register = ({
  email,
  password,
  firstName,
  lastName,
}: Register2Input): Promise<RegisterAPIResponse> => {
  return apiClient.post("/auth/v1/register", {
    email,
    password,
    firstName,
    lastName,
  });
};

const verifyEmail = ({
  verificationToken,
  accessToken,
}: { accessToken: string } & VerifyInput): Promise<VerifyEmailAPIResponse> => {
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

const checkEmail = ({ email }: RegisterInput): Promise<CheckEmailAPIResponse> => {
  return apiClient.post("/auth/v1/checkEmail", {
    email,
  });
};

const getUser = (accessToken: string): Promise<UserAPIResponse> => {
  return apiClient.get("/auth/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default {
  apiClient,
  verifyEmail,
  reverifyEmail,
  checkEmail,
  getUser,
  register,
  login,
};
