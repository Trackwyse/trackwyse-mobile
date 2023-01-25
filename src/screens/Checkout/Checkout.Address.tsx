/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";
import { useCheckout } from "@/contexts/Checkout";
import AddressInput from "@/components/AddressInput";

interface CheckoutScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Checkout: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const { checkout, setCheckout } = useCheckout();

  const mutation = useMutation({
    mutationFn: async (values: UpdateStoreCheckoutAddressInput) => {
      return api.updateStoreCheckoutAddress(values, accessToken);
    },
  });

  return (
    <AddressInput
      title="Shipping Address"
      description="Update the address where you would like to ship this label."
      mutation={mutation}
      onSubmit={(values: AddressInput, addressInput: any) => {
        mutation.mutate(values, {
          onSuccess: ({ data }) => {
            setCheckout({
              ...checkout,
              ...data.checkout,
            });

            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Updated shipping address",
            });

            navigation.goBack();
          },
          onError: () => {
            addressInput.setErrors({
              address1: "Invalid address provided",
            });
          },
        });
      }}
    />
  );
};

export default Checkout;
