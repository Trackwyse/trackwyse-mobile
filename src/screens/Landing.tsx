import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, SafeAreaView } from "react-native";

import Hyperlink from "../components/Hyperlink";
import Button from "../components/Button";
import tw from "../lib/tailwind";

interface LandingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Landing: React.FC<LandingScreenProps> = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate("login");
  };

  const navigateToRegister = () => {
    navigation.navigate("register");
  };

  return (
    <View>
      <SafeAreaView style={tw`flex justify-between items-center h-full bg-aqua-100`}>
        <View style={tw`items-center w-full`}>
          <Text style={tw`text-xl font-medium mt-4`}>trackerwind</Text>
        </View>
        <View style={tw`items-center w-full`}>
          <View style={tw`w-11/12 items-start`}>
            <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
            <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Notified when found.</Text>
            <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Day saved.</Text>
          </View>
        </View>
        <View style={tw`bg-white w-full items-center rounded-t-3xl pt-4 pb-8`}>
          <Button size="lg" onPress={navigateToRegister}>
            Create Account
          </Button>
          <Hyperlink
            style={tw`py-8`}
            textStyle={tw`font-medium text-base`}
            onPress={navigateToLogin}
          >
            Been here before? Login instead
          </Hyperlink>
          <Hyperlink style={tw`pt-8`} textStyle={tw`font-medium text-gray-300 no-underline`}>
            Terms of Service
          </Hyperlink>
        </View>
      </SafeAreaView>
      <View style={tw`p-5 bg-white`} />
    </View>
  );
};

export default Landing;
