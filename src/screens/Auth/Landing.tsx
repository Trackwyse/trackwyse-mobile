import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, SafeAreaView } from "react-native";

import TermsOfService from "@/components/TermsOfService/TermsOfService";
import useBottomSheetRef from "@/hooks/useBottomSheetRef";
import Hyperlink from "@/components/Hyperlink";
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import Swiper from "react-native-swiper";
import LandingCarousel from "@/components/LandingCarousel";

interface LandingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Landing: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { open, bottomSheetRef } = useBottomSheetRef();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToRegister = () => {
    navigation.navigate("RegisterStep1");
  };

  return (
    <View>
      <TermsOfService innerRef={bottomSheetRef} />
      <View style={tw`flex justify-between items-center h-full `}>
        <LandingCarousel />

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
          <Hyperlink
            style={tw`pt-8`}
            textStyle={tw`font-medium text-gray-300 no-underline`}
            onPress={open}
          >
            Terms of Service
          </Hyperlink>
        </View>
      </View>
    </View>
  );
};

export default Landing;
