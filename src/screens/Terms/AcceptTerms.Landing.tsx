import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";

interface AcceptTermsProps {
  navigation: NativeStackNavigationProp<any>;
}

const AcceptTerms: React.FC<AcceptTermsProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("AcceptTermsAction");
  };

  return (
    <Container style={tw`h-full`}>
      <Text variant="title">Terms and Conditions</Text>
      <Text variant="subtitle">
        It looks like you haven't accepted our terms and conditions yet. Let's get you up to speed.
      </Text>

      <View style={tw`flex-row-reverse mt-auto mb-10`}>
        <BadgeButton size="lg" iconRight="arrow-forward" onPress={onPress}>
          Next
        </BadgeButton>
      </View>
    </Container>
  );
};

export default AcceptTerms;
