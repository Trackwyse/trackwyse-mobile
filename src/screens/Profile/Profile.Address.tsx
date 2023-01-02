import { useFormik } from "formik";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";

const Profile: React.FC = () => {
  const { user, accessToken, updateUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: UpdateUserInput) => {
      return api.updateUser(values, accessToken);
    },
  });

  const addressInput = useFormik({
    initialValues: {
      address1: user?.address?.address1 || "",
      address2: user?.address?.address2 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zip5: user?.address?.zip5 || "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
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
    },
  });

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={tw`items-center`}
      style={tw`h-full w-full`}
    >
      <View style={tw`w-11/12 pt-10`}>
        <Text style={tw`text-2xl font-bold`}>Address</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your shipping address. This will be used for all future orders and can be changed
          at any time.
        </Text>
      </View>

      <Input
        placeholder="Address 1"
        size="lg"
        style={tw`my-1`}
        value={addressInput.values.address1}
        disabled={mutation.isLoading}
        error={addressInput.errors.address1}
        onChangeText={addressInput.handleChange("address1")}
      />
      <Input
        placeholder="Address 2"
        size="lg"
        style={tw`my-1`}
        value={addressInput.values.address2}
        disabled={mutation.isLoading}
        error={addressInput.errors.address2}
        onChangeText={addressInput.handleChange("address2")}
      />
      <Input
        placeholder="City"
        size="lg"
        style={tw`my-1`}
        value={addressInput.values.city}
        disabled={mutation.isLoading}
        error={addressInput.errors.city}
        onChangeText={addressInput.handleChange("city")}
      />
      <Input
        placeholder="State"
        size="lg"
        style={tw`my-1`}
        value={addressInput.values.state}
        disabled={mutation.isLoading}
        error={addressInput.errors.state}
        onChangeText={addressInput.handleChange("state")}
      />
      <Input
        placeholder="Zip Code"
        size="lg"
        style={tw`my-1`}
        value={addressInput.values.zip5}
        disabled={mutation.isLoading}
        error={addressInput.errors.zip5}
        onChangeText={addressInput.handleChange("zip5")}
      />
      <Button
        size="lg"
        style={tw`mt-2`}
        loading={mutation.isLoading}
        onPress={() => addressInput.handleSubmit()}
      >
        Update
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
