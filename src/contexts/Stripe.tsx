import { StripeProvider as StripeProviderBase } from "@stripe/stripe-react-native";

import AppConstants from "@/lib/constants";

const StripeProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <StripeProviderBase publishableKey={AppConstants.stripePublicKey}>
      {children}
    </StripeProviderBase>
  );
};

export default StripeProvider;
