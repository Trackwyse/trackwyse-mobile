import { useFormik } from "formik";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import BadgeButton from "../components/BadgeButton";
import { validateResetPasswordInput } from "../lib/validators";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation, route }) => {
  const { email } = route.params;

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordInput) => {
      return api.resetPassword(values);
    },
  });

  const resetPasswordInput = useFormik({
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
      resetToken: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateResetPasswordInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          navigation.navigate("landing");
          Toast.show({
            type: "success",
            text1: "Password Reset",
            text2: "Your can now login with your new password",
          });
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            resetPasswordInput.setErrors({
              resetToken: error.response?.data.message || "An error occurred",
            });
          }
        },
      });
    },
  });

  const onSubmit = () => {
    resetPasswordInput.handleSubmit();
  };

  return (
    <View style={tw`h-full items-center`}>
      <KeyboardAvoidingView style={tw` w-full items-center justify-end flex-1`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Forgot Password</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            We've sent you an email with a one-time code to reset your password. Enter the code
            below along with your new password.
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Password Reset Token"
          style={tw`my-1`}
          error={resetPasswordInput.errors.resetToken}
          value={resetPasswordInput.values.resetToken}
          onChangeText={resetPasswordInput.handleChange("resetToken")}
        />
        <Input
          size="lg"
          secureTextEntry
          placeholder="Password"
          style={tw`my-1`}
          error={resetPasswordInput.errors.password}
          value={resetPasswordInput.values.password}
          onChangeText={resetPasswordInput.handleChange("password")}
        />
        <Input
          size="lg"
          secureTextEntry
          placeholder="Confirm Password"
          style={tw`my-1`}
          error={resetPasswordInput.errors.confirmPassword}
          value={resetPasswordInput.values.confirmPassword}
          onChangeText={resetPasswordInput.handleChange("confirmPassword")}
        />
        <View style={tw`flex-1`} />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`flex-row-reverse w-11/12 mt-auto mb-10  `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <BadgeButton
          size="lg"
          iconRight="arrow-forward"
          loading={mutation.isLoading}
          disabled={!resetPasswordInput.dirty}
          onPress={onSubmit}
        >
          Submit
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
