import { useFormik } from "formik";
import { KeyboardAvoidingView, Text, View } from "react-native";

import tw from "../lib/tailwind";
import Input from "../components/Input";
import BadgeButton from "../components/BadgeButton";
import { validateVerifyInput } from "../lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const registerInput = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateVerifyInput,
    onSubmit: (values) => {
      navigation.navigate("register4");

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
          <Text style={tw`text-2xl font-bold`}>Verification</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Enter the 6 digit code that we sent to bob*****@gmail.com
          </Text>
        </View>
        <Input
          size="lg"
          placeholder="Verification Code"
          keyboardType="numeric"
          style={tw`my-1`}
          error={registerInput.errors.verificationCode}
          value={registerInput.values.verificationCode}
          onChangeText={registerInput.handleChange("verificationCode")}
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
