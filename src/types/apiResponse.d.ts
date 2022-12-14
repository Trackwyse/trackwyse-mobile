interface APIResponse {
  data: {
    error: boolean;
    message: string;
  };
}

type AddLabelAPIResponse = APIResponse 

type ModifyLabelAPIResponse = APIResponse

type VerifyEmailAPIResponse = APIResponse

type ReverifyEmailAPIResponse = APIResponse 

type AcceptTermsAPIResponse = APIResponse

type LoginAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
}

type RegisterAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
}

type UserAPIResponse = APIResponse & {
  data: {
    user: User;
  };
}

type CheckEmailAPIResponse = APIResponse & {
  data: {
    emailInUse: boolean;
  };
}

type GetLabelsAPIResponse = APIResponse & {
  data: {
    labels: Label[];
  };
}