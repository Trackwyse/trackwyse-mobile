import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Input from "@/components/Input";
import BadgeButton from "@/components/BadgeButton";
import { validateForgotPasswordInput } from "@/lib/validators";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordInput) => {
      return api.forgotPassword(values);
    },
  });

  const forgotPasswordInput = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateForgotPasswordInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          navigation.navigate("forgotPassword3", { email: values.email });
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            forgotPasswordInput.setErrors({
              email: error.response?.data.message || "An error occurred",
            });
          }
        },
      });
    },
  });

  const onSubmit = () => {
    forgotPasswordInput.handleSubmit();
  };

  return (
    <View style={tw`h-full items-center`}>
      <KeyboardAvoidingView style={tw` w-full items-center justify-end flex-1`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Forgot Password</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Enter the email address associated with your account and we'll send you a code to reset
            your password.
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Email"
          style={tw`my-1`}
          error={forgotPasswordInput.errors.email}
          value={forgotPasswordInput.values.email}
          onChangeText={forgotPasswordInput.handleChange("email")}
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
          disabled={!forgotPasswordInput.dirty}
          onPress={onSubmit}
        >
          Next
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
