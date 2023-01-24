/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

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

type UpdateUserPasswordAPIResponse = APIResponse;

type ClaimFreeLabelsAPIResponse = APIResponse;

type DeleteUserAccountAPIResponse = APIResponse;

type SetPremiumAPIResponse = APIResponse;

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
    refreshToken: string;
  };
};

type RegisterAPIResponse = APIResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
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

type FoundLabelDetailsAPIResponse = APIResponse & {
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

type GetSubscriptionAPIResponse = APIResponse & {
  data: {
    subscriptionActive: boolean;
    subscriptionDate: string;
    subscriptionReceipt: SubscriptionReceipt;
    subscriptionPerks: SubscriptionPerks;
  };
};

type CreateSubscriptionAPIResponse = APIResponse & {
  data: {
    user: User;
  };
};

type GetDistanceAPIResponse = APIResponse & {
  data: {
    distance: Distance;
  };
};

type GetStoreProductsAPIResponse = APIResponse & {
  data: {
    pageInfo: PageInfo;
    products: Product[];
  };
};

type GetUserTransactionsAPIResponse = APIResponse & {
  data: {
    pageInfo: PageInfo;
    transactions: Transaction[];
  };
};

type GetUserTransactionAPIResponse = APIResponse & {
  data: {
    transaction: TransactionDetails;
  };
};
