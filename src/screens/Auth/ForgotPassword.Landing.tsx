import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
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
      <Text variant="title">Forgot Password</Text>
      <Text variant="subtitle">
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
