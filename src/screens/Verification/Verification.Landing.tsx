/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";

interface VerifyProps {
  navigation: NativeStackNavigationProp<any>;
}

const Verify: React.FC<VerifyProps> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("VerificationAction");
  };

  return (
    <Container style={tw`h-full`}>
      <Text variant="title">Verification</Text>
      <Text variant="subtitle">
        It looks like your email is unverified. Let's get you verified.
      </Text>

      <View style={tw`flex-row-reverse mt-auto mb-10`}>
        <BadgeButton size="lg" iconRight="arrow-forward" onPress={onPress}>
          Next
        </BadgeButton>
      </View>
    </Container>
  );
};

export default Verify;
