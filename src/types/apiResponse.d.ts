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

type CreatePaymentIntentAPIResponse = APIResponse;

type CompletePaymentAPIResponse = APIResponse & {
  data: {
    confirmationData?: string;
    order?: {
      id: string;
      userEmail: string;
      created: string;
    };
  };
};

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

type GetStoreProductAPIResponse = APIResponse & {
  data: {
    product: ProductDetails;
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

type GetStoreCheckoutAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type AddProductToStoreCheckoutAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type RemoveProductFromStoreCheckoutAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type UpdateProductInStoreCheckoutAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type UpdateStoreCheckoutAddressAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type UpdateStoreCheckoutBillingAddressAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};

type UpdateDeliveryMethodAPIResponse = APIResponse & {
  data: {
    checkout: Checkout;
  };
};
