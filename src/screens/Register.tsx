import { useFormik } from "formik";
import { KeyboardAvoidingView, Text, View } from "react-native";
import BadgeButton from "../components/BadgeButton";
import Input from "../components/Input";
import tw from "../lib/tailwind";
import { validateLoginInput } from "../lib/validators";

const Register: React.FC = () => {
  const registerInput = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateLoginInput,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
          error={registerInput.errors.email}
          value={registerInput.values.email}
          onChangeText={registerInput.handleChange("email")}
        />
        <Input
          size="lg"
          placeholder="Password"
          secureTextEntry
          style={tw`my-1`}
          error={registerInput.errors.password}
          value={registerInput.values.password}
          onChangeText={registerInput.handleChange("password")}
        />
        <Input
          size="lg"
          placeholder="Confirm Password"
          secureTextEntry
          style={tw`my-1`}
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
          onPress={() => registerInput.handleSubmit()}
        >
          Next
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
