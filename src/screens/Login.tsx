import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/Auth";
import { validateLoginInput } from "../lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Hyperlink from "../components/Hyperlink";

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { updateAccessToken } = useAuth();

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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "You have successfully logged in.",
          });
        },
        onError: () => {
          loginInput.setErrors({
            email: "Invalid email or password.",
            password: "Invalid email or password.",
          });
        },
      });
    },
  });

  const onForgotPress = () => {
    navigation.navigate("forgotPassword");
  };

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
        style={tw`w-full items-center mt-auto mb-10 `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Button size="lg" disabled={mutation.isLoading} onPress={() => loginInput.handleSubmit()}>
          Login
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
