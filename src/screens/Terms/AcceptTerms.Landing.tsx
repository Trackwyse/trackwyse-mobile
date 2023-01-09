import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
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
      <Text style={tw`text-2xl font-bold pt-10`}>Terms and Conditions</Text>
      <Text style={tw`my-4 text-gray-400 text-base`}>
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
