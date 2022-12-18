import { View, Text } from "react-native";
import { useFormik } from "formik";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "../lib/tailwind";
import BadgeButton from "../components/BadgeButton";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const forgotPasswordInput = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false
  })

  return <></>;
};

export default ForgotPassword;
