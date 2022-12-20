import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import BadgeButton from "@/components/BadgeButton";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("ForgotPasswordAction");
  };

  return (
    <View style={tw`h-full`}>
      <View style={tw`items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Forgot Password</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Forgot your password? No worries. We'll guide you through the process of resetting it.
          </Text>
        </View>
      </View>

      <View style={tw`flex-row-reverse w-11/12 mt-auto mb-10`}>
        <BadgeButton size="lg" iconRight="arrow-forward" onPress={onPress}>
          Next
        </BadgeButton>
      </View>
    </View>
  );
};

export default ForgotPassword;
