interface APIResponse {
  data: {
    error: boolean;
    message: string;
  };
}

type LogoutAPIResponse = APIResponse;

type DeleteLabelAPIResponse = APIResponse;

type VerifyEmailAPIResponse = APIResponse;

type ReverifyEmailAPIResponse = APIResponse;

type ForgotPasswordAPIResponse = APIResponse;

type ResetPasswordAPIResponse = APIResponse;

type AcceptTermsAPIResponse = APIResponse;

type FoundLabelDetailsAPIResponse = APIResponse;

type UpdateUserPasswordAPIResponse = APIResponse;

type RefreshAccessTokenAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
};

type ValidClientsAPIResponse = APIResponse & {
  data: {
    version: string;
  };
};

type LoginAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
};

type RegisterAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
};

type ModifyLabelAPIResponse = APIResponse & {
  data: {
    label: Label;
  };
};

type AddLabelAPIResponse = APIResponse & {
  data: {
    label: Label;
  };
};

type RecoverLabelAPIResponse = APIResponse & {
  data: {
    label: Label;
  };
};

type UpdateUserAPIResponse = APIResponse & {
  data: {
    user: User;
  };
};

type UserAPIResponse = APIResponse & {
  data: {
    user: User;
  };
};

type CheckEmailAPIResponse = APIResponse & {
  data: {
    emailInUse: boolean;
  };
};

type GetLabelsAPIResponse = APIResponse & {
  data: {
    labels: Label[];
  };
};

type GetLabelAPIResponse = APIResponse & {
  data: {
    label: Label;
  };
};
