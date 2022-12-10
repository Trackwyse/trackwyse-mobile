import { useFormik } from "formik";
import { KeyboardAvoidingView, Text, View } from "react-native";

import { validateLoginInput } from "../lib/validators";
import Button from "../components/Button";
import Input from "../components/Input";
import tw from "../lib/tailwind";
import apiClient from "../api";
import { useAuth } from "../contexts/Auth";
import { useMutation } from "@tanstack/react-query";

const Login: React.FC = () => {
  const { updateAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (values: LoginInput) => {
      return apiClient.post("/auth/v1/login", values);
    }
  })

  const loginInput = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateLoginInput,
    onSubmit: (values) => {},
  });

  return (
    <View style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`items-center justify-end flex-1`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Log In</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Welcome back! Enter your email below to access your account.
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Email"
          style={tw`my-1`}
          error={loginInput.errors.email}
          value={loginInput.values.email}
          onChangeText={loginInput.handleChange("email")}
        />
        <Input
          size="lg"
          placeholder="Password"
          secureTextEntry
          style={tw`my-1`}
          error={loginInput.errors.password}
          value={loginInput.values.password}
          onChangeText={loginInput.handleChange("password")}
        />
        <View style={tw`flex-1`} />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`w-full items-center mt-auto mb-10 `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Button size="lg" onPress={() => loginInput.handleSubmit()}>
          Login
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
