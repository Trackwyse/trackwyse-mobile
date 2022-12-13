import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import apiClient from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import BadgeButton from "../components/BadgeButton";
import { validateRegisterInput } from "../lib/validators";

interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const mutation = useMutation({
    mutationFn: (values: RegisterInput) => {
      return apiClient.checkEmail(values);
    },
  });

  const registerInput = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateRegisterInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: ({ data }) => {
          if (data.emailInUse) {
            registerInput.setErrors({
              email: "Email already in use.",
            });
            return;
          }

          navigation.navigate("register2", {
            email: values.email,
            password: values.password,
          });
        },
        onError: () => {
          registerInput.setErrors({
            email: "Email already in use.",
          });
        },
      });

      // Set isSubmitting to false so that the button is enabled again
      registerInput.setSubmitting(false);
    },
  });

  const onSubmit = () => {
    registerInput.handleSubmit();
  }; 

  return (
    <View style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`items-center justify-end flex-1`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Register</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Welcome to Trackerwind. Enter an email and password to get started.
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Email"
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={registerInput.errors.email}
          value={registerInput.values.email}
          onChangeText={registerInput.handleChange("email")}
        />
        <Input
          size="lg"
          placeholder="Password"
          secureTextEntry
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={registerInput.errors.password}
          value={registerInput.values.password}
          onChangeText={registerInput.handleChange("password")}
        />
        <Input
          size="lg"
          placeholder="Confirm Password"
          secureTextEntry
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={registerInput.errors.confirmPassword}
          value={registerInput.values.confirmPassword}
          onChangeText={registerInput.handleChange("confirmPassword")}
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
          disabled={registerInput.isSubmitting || !registerInput.dirty}
          onPress={onSubmit}
        >
          Next
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
