/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { View, KeyboardAvoidingView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import errorHandler from "@/lib/errorHandler";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";
import { validateResetPasswordInput } from "@/lib/validators";

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
          navigation.navigate("Home");
          Toast.show({
            type: "success",
            text1: "Password Reset",
            text2: "Your can now login with your new password",
          });
        },
        onError: (err) => {
          errorHandler.handle(err, resetPasswordInput);
        },
      });
    },
  });

  const onSubmit = () => {
    resetPasswordInput.handleSubmit();
  };

  return (
    <Container style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`justify-end flex-1`}>
        <Text variant="title">Forgot Password</Text>
        <Text variant="subtitle">
          We've sent you an email with a one-time code to reset your password. Enter the code below
          along with your new password.
        </Text>

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
        style={tw`flex-row-reverse mt-auto mb-10`}
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
    </Container>
  );
};

export default ForgotPassword;
