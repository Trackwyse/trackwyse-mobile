import { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

import tw from "../lib/tailwind";
import BadgeButton from "../components/BadgeButton";

const Register: React.FC = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const onSelect = () => {
    setSelected(!selected);
  };

  const onSubmit = () => {};

  return (
    <View style={tw`h-full items-center`}>
      <KeyboardAvoidingView style={tw`items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Terms and Conditions</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            By selecting “I agree” below, I have read and agree to the terms of
            use and acknowledge the privacy notice. I am at least 13 years of
            age.
          </Text>
        </View>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`flex-row justify-between w-11/12 mt-auto mb-10  `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <BadgeButton
          size="lg"
          onPress={onSelect}
          disabled={selected}
          iconRight={selected ? "checkmark-done-outline" : "checkmark-outline"}
        >
          I Agree
        </BadgeButton>
        <BadgeButton
          size="lg"
          iconRight="arrow-forward"
          disabled={!selected}
          onPress={onSubmit}
        >
          Finish
        </BadgeButton>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
