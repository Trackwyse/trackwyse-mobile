import { AxiosError } from "axios";
import { useFormik } from "formik";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import { validateUpdateUserPasswordInput } from "@/lib/validators";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: UpdateUserPasswordInput) => {
      return api.updateUserPassword(values, accessToken);
    },
  });

  const userInfoInput = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateUpdateUserPasswordInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Your password has been updated successfully",
          });

          navigation.goBack();
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            const { message } = err.response?.data;
            userInfoInput.setErrors({ currentPassword: message });
          }
        },
      });
    },
  });

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={tw`h-full w-full`}
      >
        <Text style={tw`text-2xl font-bold pt-10`}>Update Password</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your password. Make sure to choose a strong password that you don't use anywhere
          else.
        </Text>

        <Input
          secureTextEntry
          placeholder="Current Password"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.currentPassword}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.currentPassword}
          onChangeText={userInfoInput.handleChange("currentPassword")}
        />
        <Input
          secureTextEntry
          placeholder="New Password"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.newPassword}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.newPassword}
          onChangeText={userInfoInput.handleChange("newPassword")}
        />
        <Input
          secureTextEntry
          placeholder="Confirm New Password"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.confirmPassword}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.confirmPassword}
          onChangeText={userInfoInput.handleChange("confirmPassword")}
        />
        <Button
          size="lg"
          style={tw`mt-2`}
          loading={mutation.isLoading}
          onPress={() => userInfoInput.handleSubmit()}
        >
          Update
        </Button>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Profile;
