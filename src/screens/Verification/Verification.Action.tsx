/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { KeyboardAvoidingView, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import { useAuth } from "@/contexts/Auth";
import Hyperlink from "@/components/Hyperlink";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";
import { validateVerifyInput } from "@/lib/validators";
import useAuthenticatedMutation from "@/hooks/useAuthenticatedMutation";

const Verify: React.FC = () => {
  const { user, updateUser } = useAuth();

  const verificationMutation = useAuthenticatedMutation({
    mutationFn: (values: VerifyInput) => {
      return api.verifyEmail(values);
    },
  });

  const reverificationMutation = useAuthenticatedMutation({
    mutationFn: (values) => {
      return api.reverifyEmail(values.accessToken as string);
    },
  });

  const verifyInput = useFormik({
    initialValues: {
      verificationToken: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateVerifyInput,
    onSubmit: (values) => {
      verificationMutation.mutate(values, {
        onSuccess: () => {
          updateUser({
            ...user,
            verified: true,
          });
        },
        onError: () => {
          verifyInput.setErrors({
            verificationToken: "Invalid verification code",
          });
        },
      });

      // Set isSubmitting to false so that the button is enabled again
      verifyInput.setSubmitting(false);
    },
  });

  const onReverifyPress = () => {
    reverificationMutation.mutate(
      {},
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Reverification email sent",
            text2: "Please check your email for the verification code",
          });
        },
        onError: () => {
          verifyInput.setErrors({
            verificationToken: "Verification code already sent. Please wait 5 minutes.",
          });
        },
      }
    );
  };

  const onSubmit = () => {
    verifyInput.handleSubmit();
  };

  return (
    <Container style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`justify-end flex-1`}>
        <Text variant="title">Verification</Text>
        <Text variant="subtitle">
          We sent a verification code to your email address. Please enter it
        </Text>

        <Input
          size="lg"
          placeholder="Verification Code"
          keyboardType="numeric"
          style={tw`my-1`}
          error={verifyInput.errors.verificationToken}
          value={verifyInput.values.verificationToken}
          onChangeText={verifyInput.handleChange("verificationToken")}
        />

        <Hyperlink style={tw`mt-2`} onPress={onReverifyPress}>
          Request another code
        </Hyperlink>

        <View style={tw`flex-1`} />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`flex-row-reverse mt-auto mb-10  `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <BadgeButton
          size="lg"
          iconRight="arrow-forward"
          loading={verificationMutation.isLoading}
          disabled={verifyInput.isSubmitting || !verifyInput.dirty}
          onPress={onSubmit}
        >
          Next
        </BadgeButton>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Verify;
