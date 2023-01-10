import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";
import { validateRegisterInput } from "@/lib/validators";

interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const mutation = useMutation({
    mutationFn: (values: RegisterInput) => {
      return api.checkEmail(values);
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
    validate: (values) => validateRegisterInput(values, 1),
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: ({ data }) => {
          if (data.emailInUse) {
            registerInput.setErrors({
              email: "Email already in use.",
            });
            return;
          }

          navigation.navigate("RegisterStep2", {
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
    <Container style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`justify-end flex-1`}>
        <Text variant="title">Register</Text>
        <Text variant="subtitle">
          Welcome to Trackwyse. Enter an email and password to get started.
        </Text>

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
        style={tw`flex-row-reverse mt-auto mb-10`}
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
    </Container>
  );
};

export default Register;
