/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import Hyperlink from "@/components/Hyperlink";
import { validateLoginInput } from "@/lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import errorHandler from "@/lib/errorHandler";

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { updateRefreshToken, updateAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (values: LoginInput) => {
      return api.login(values);
    },
  });

  const loginInput = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateLoginInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: ({ data }) => {
          updateAccessToken(data.accessToken);
          updateRefreshToken(data.refreshToken);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "You have successfully logged in.",
          });
        },
        onError: (err) => {
          errorHandler.handle(err, loginInput);
        },
      });
    },
  });

  const onForgotPress = () => {
    navigation.navigate("ForgotPasswordLanding");
  };

  return (
    <Container style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`justify-end flex-1`}>
        <Text variant="title">Log In</Text>
        <Text variant="subtitle">Welcome back! Enter your email below to access your account.</Text>

        <Input
          size="lg"
          placeholder="Email"
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={loginInput.errors.email}
          value={loginInput.values.email}
          onChangeText={loginInput.handleChange("email")}
        />
        <Input
          size="lg"
          placeholder="Password"
          secureTextEntry
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={loginInput.errors.password}
          value={loginInput.values.password}
          onChangeText={loginInput.handleChange("password")}
        />

        <Hyperlink style={tw`justify-start w-11/12 mt-2`} onPress={onForgotPress}>
          Forgot Password?
        </Hyperlink>

        <View style={tw`flex-1`} />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`mt-auto mb-10`}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Button size="lg" disabled={mutation.isLoading} onPress={() => loginInput.handleSubmit()}>
          Login
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
