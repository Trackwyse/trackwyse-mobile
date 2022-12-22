import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import BadgeButton from "@/components/BadgeButton";

interface AcceptTermsProps {
  navigation: NativeStackNavigationProp<any>;
}

const AcceptTerms: React.FC<AcceptTermsProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("AcceptTermsAction");
  };

  return (
    <View style={tw`h-full`}>
      <View style={tw`items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Terms and Conditions</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            It looks like you haven't accepted our terms and conditions yet. Let's get you up to
            speed.
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

export default AcceptTerms;
