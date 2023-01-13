/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";
import AddressInput from "@/components/AddressInput";

const Profile: React.FC = () => {
  const { user, accessToken, updateUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: UpdateUserInput) => {
      return api.updateUser(values, accessToken);
    },
  });

  return (
    <AddressInput
      title="Address"
      description="Update your shipping address. This will be used for all future orders and can be changed at any time"
      mutation={mutation}
      initialAddress={user?.address}
      onSubmit={(values: AddressInput, addressInput: any) => {
        mutation.mutate(values, {
          onSuccess: ({ data }) => {
            updateUser(data.user);

            // Update the values in the form so that the user can see the updated values
            addressInput.setValues({
              address1: data.user.address.address1,
              address2: data.user.address.address2,
              city: data.user.address.city,
              state: data.user.address.state,
              zip5: data.user.address.zip5,
            });

            Toast.show({
              type: "success",
              text1: "Success",
              text2: "User info updated successfully",
            });
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "There was an error updating your account",
            });

            addressInput.setErrors({
              address1: "Invalid address provided",
            });
          },
        });
      }}
    />
  );
};

export default Profile;
