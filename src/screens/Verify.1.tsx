import { View, Text } from "react-native";
import tw from "../lib/tailwind";
import BadgeButton from "../components/BadgeButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface VerifyProps {
  navigation: NativeStackNavigationProp<any>;
}

const Verify: React.FC<VerifyProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("verify2");
  };

  return (
    <View style={tw`h-full`}>
      <View style={tw`items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Verification</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            It looks like your email is unverified. Let's get you verified.
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

export default Verify;
