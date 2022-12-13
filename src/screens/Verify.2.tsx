import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import { useAuth } from "../contexts/Auth";
import BadgeButton from "../components/BadgeButton";
import { validateVerifyInput } from "../lib/validators";

const Verify: React.FC = () => {
  const { user, updateUser, accessToken } = useAuth();

  const verificationMutation = useMutation({
    mutationFn: (values: VerifyInput) => {
      return api.verifyEmail(values, accessToken);
    },
  });

  const reverificationMutation = useMutation({
    mutationFn: () => {
      return api.reverifyEmail(accessToken);
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
        onSuccess: ({ data }) => {
          updateUser({
            ...user,
            verified: true,
          });
        },
        onError: (error) => {
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
    reverificationMutation.mutate(undefined, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Reverification email sent",
          text2: "Please check your email for the verification code",
        });
      },
      onError: (error) => {
        verifyInput.setErrors({
          verificationToken:
            "Verification code already sent. Please wait 5 minutes.",
        });
      },
    });
  };

  const onSubmit = () => {
    verifyInput.handleSubmit();
  };

  return (
    <View style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`items-center justify-end flex-1`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Verification</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            We sent a verification code to your email address. Please enter it
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Verification Code"
          keyboardType="numeric"
          style={tw`my-1`}
          error={verifyInput.errors.verificationToken}
          value={verifyInput.values.verificationToken}
          onChangeText={verifyInput.handleChange("verificationToken")}
        />

        <TouchableOpacity
          style={tw`justify-start w-11/12 mt-2`}
          onPress={onReverifyPress}
        >
          <Text style={tw`underline text-primary-100`}>
            Request another code
          </Text>
        </TouchableOpacity>

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
          loading={verificationMutation.isLoading}
          disabled={verifyInput.isSubmitting || !verifyInput.dirty}
          onPress={onSubmit}
        >
          Next
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Verify;
