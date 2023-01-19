/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import AddressInput from "@/components/AddressInput";
import { useDynamicLabels } from "@/contexts/DynamicLabels";

const FoundLabel: React.FC = () => {
  const { foundLabel, setFoundLabel } = useDynamicLabels();

  const mutation = useMutation({
    mutationFn: async (values: FoundLabelDetailsInput) => {
      return api.updateFoundLabelDetails(values);
    },
  });

  return (
    <AddressInput
      title="Exact Location"
      description="Update the location where you found this label. The owner will be notified of the location."
      mutation={mutation}
      initialAddress={foundLabel.foundExactLocation}
      onSubmit={(values: AddressInput, addressInput: any) => {
        mutation.mutate(
          { id: foundLabel.uniqueID, exactLocation: values },
          {
            onSuccess: ({ data }) => {
              setFoundLabel(data.label);

              // Update the values in the form so that the user can see the updated values
              addressInput.setValues({
                address1: data.label.foundExactLocation?.address1,
                address2: data.label.foundExactLocation?.address2,
                city: data.label.foundExactLocation?.city,
                state: data.label.foundExactLocation?.state,
                zip5: data.label.foundExactLocation?.zip5,
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
