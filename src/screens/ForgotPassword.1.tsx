import { View, Text } from "react-native";

import tw from "../lib/tailwind";
import BadgeButton from "../components/BadgeButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("forgotPassword2");
  };

  return <></>;
};

export default ForgotPassword;
