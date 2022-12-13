import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import { useAuth } from "../contexts/Auth";
import BadgeButton from "../components/BadgeButton";
import { validateRegisterInput } from "../lib/validators";

interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const Register: React.FC<RegisterScreenProps> = ({ route, navigation }) => {
  const { updateAccessToken } = useAuth();
  const { email, password } = route.params;

  const mutation = useMutation({
    mutationFn: (values: RegisterInput) => {
      return api.register(values);
    },
  });

  const registerInput = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => validateRegisterInput(values, 2),
    onSubmit: (values) => {
      mutation.mutate(
        {
          ...values,
          email,
          password,
        },
        {
          onSuccess: ({ data }) => {
            updateAccessToken(data.accessToken);
          },
        }
      );

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
          <Text style={tw`text-2xl font-bold`}>What's your name?</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Tell us how we should properly address you.
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="First Name"
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={registerInput.errors.firstName}
          value={registerInput.values.firstName}
          onChangeText={registerInput.handleChange("firstName")}
        />
        <Input
          size="lg"
          placeholder="Last Name"
          style={tw`my-1`}
          disabled={mutation.isLoading}
          error={registerInput.errors.lastName}
          value={registerInput.values.lastName}
          onChangeText={registerInput.handleChange("lastName")}
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
