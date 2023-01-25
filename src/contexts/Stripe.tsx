import { StripeProvider as StripeProviderBase } from "@stripe/stripe-react-native";

const StripeProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <StripeProviderBase publishableKey="pk_test_51LKPLLLRrR4p45sTnKwSJkz7qOUtms6B8T3mPxxslSAR52R7EYRx2U3lkJEF8PvcvTowrvxk68annvd222YRf7uJ00QFVKAox6">
      {children}
    </StripeProviderBase>
  );
};

export default StripeProvider;
