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
import { useDynamicLabels } from "@/contexts/DynamicLabels";

const FoundLabel: React.FC = () => {
  const { accessToken } = useAuth();
  const { foundLabel, setFoundLabel } = useDynamicLabels();

  const mutation = useMutation({
    mutationFn: async (values: FoundLabelDetailsInput) => {
      return api.updateFoundLabelDetails(values, accessToken);
    },
  });

  return (
    <AddressInput
      title="Recovery Location"
      description="Update the location where the owner can recover this label. The owner will be notified of the location."
      mutation={mutation}
      initialAddress={foundLabel.foundRecoveryLocation}
      onSubmit={(values: AddressInput, addressInput: any) => {
        mutation.mutate(
          { id: foundLabel._id, recoveryLocation: values },
          {
            onSuccess: ({ data }) => {
              setFoundLabel(data.label);

              // Update the values in the form so that the user can see the updated values
              addressInput.setValues({
                address1: data.label.foundRecoveryLocation?.address1,
                address2: data.label.foundRecoveryLocation?.address2,
                city: data.label.foundRecoveryLocation?.city,
                state: data.label.foundRecoveryLocation?.state,
                zip5: data.label.foundRecoveryLocation?.zip5,
              });

              Toast.show({
                type: "success",
                text1: "Success",
                text2: "Updated label location",
              });
            },
            onError: () => {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "There was an error updating this label",
              });

              addressInput.setErrors({
                address1: "Invalid address provided",
              });
            },
          }
        );
      }}
    />
  );
};

export default FoundLabel;
