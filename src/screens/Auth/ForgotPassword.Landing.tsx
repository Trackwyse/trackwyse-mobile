import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("ForgotPasswordAction");
  };

  return (
    <Container style={tw`h-full`}>
      <Text style={tw`text-2xl font-bold pt-10`}>Forgot Password</Text>
      <Text style={tw`my-4 text-gray-400 text-base`}>
        Forgot your password? No worries. We'll guide you through the process of resetting it.
      </Text>

      <View style={tw`flex-row-reverse mt-auto mb-10`}>
        <BadgeButton size="lg" iconRight="arrow-forward" onPress={onPress}>
          Next
        </BadgeButton>
      </View>
    </Container>
  );
};

export default ForgotPassword;
