import axios from "axios";

const endpoint = "https://trackerwind.in-staging.space";

// Base API Client
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

const addLabel = ({
  id,
  accessToken,
}: { accessToken: string } & AddLabelInput): Promise<AddLabelAPIResponse> => {
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

const getLabels = (accessToken: string): Promise<GetLabelsAPIResponse> => {
  return apiClient.get("/api/v1/labels", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const modifyLabel = ({accessToken, id, name, color, message, phoneNumber}: {accessToken: string} & ModifyLabelInput): Promise<ModifyLabelAPIResponse> => {
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


export default {
  addLabel,
  getLabels,
  modifyLabel,
  apiClient,
  verifyEmail,
  reverifyEmail,
  checkEmail,
  getUser,
  register,
  login,
};
