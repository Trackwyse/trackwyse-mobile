/*
 * Created on Fri Jan 27 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";
import errorHandler from "@/lib/errorHandler";
import { useCheckout } from "@/contexts/Checkout";
import AddressInput from "@/components/AddressInput";

interface CartScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Cart: React.FC<CartScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const { checkout, setCheckout } = useCheckout();

  const mutation = useMutation({
    mutationFn: async (values: UpdateStoreCheckoutBillingAddressInput) => {
      return api.updateStoreCheckoutBillingAddress(values, accessToken);
    },
  });

  return (
    <AddressInput
      title="Billing Address"
      description="Update your billing address for this purchase."
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
              text2: "Updated billing address",
            });

            navigation.goBack();
          },
          onError: (err) => {
            errorHandler.handle(err, addressInput);
          },
        });
      }}
    />
  );
};

export default Cart;
