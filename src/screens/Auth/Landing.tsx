/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Hyperlink from "@/components/Hyperlink";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import useBottomSheetRef from "@/hooks/useBottomSheetRef";
import LandingCarousel from "@/components/LandingCarousel";
import TermsOfService from "@/components/TermsOfService/TermsOfService";

interface LandingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Landing: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { open: openPrivacyPolicy, bottomSheetRef: privacyPolicyRef } = useBottomSheetRef();
  const { open: openTermsOfService, bottomSheetRef: termsOfServiceRef } = useBottomSheetRef();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToRegister = () => {
    navigation.navigate("RegisterStep1");
  };

  return (
    <View>
      <PrivacyPolicy innerRef={privacyPolicyRef} />
      <TermsOfService innerRef={termsOfServiceRef} />
      <View style={tw`flex h-full `}>
        <LandingCarousel />

        <Container style={tw`bg-white items-center pt-4 pb-8`}>
          <Button size="lg" onPress={navigateToRegister}>
            Create Account
          </Button>
          <Hyperlink
            style={tw`py-8`}
            textStyle={tw`font-medium text-base`}
            onPress={navigateToLogin}
          >
            Been here before? Login
          </Hyperlink>
          <Hyperlink
            style={tw`pt-3`}
            textStyle={tw`font-medium text-gray-400 no-underline`}
            onPress={openTermsOfService}
          >
            Terms of Service
          </Hyperlink>
          <Hyperlink
            style={tw`my-2`}
            textStyle={tw`font-medium text-gray-400 no-underline`}
            onPress={openPrivacyPolicy}
          >
            Privacy Policy
          </Hyperlink>
        </Container>
      </View>
    </View>
  );
};

export default Landing;
