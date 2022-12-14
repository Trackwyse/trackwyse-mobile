import { View, Text, KeyboardAvoidingView } from "react-native";
import tw from "../lib/tailwind";
import BadgeButton from "../components/BadgeButton";

import api from "../api";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../contexts/Auth";
import { useMutation } from "@tanstack/react-query";

const AcceptTerms: React.FC = () => {
  const { user, updateUser, accessToken } = useAuth();
  const [selected, setSelected] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: () => {
      return api.acceptTerms(accessToken);
    },
  });

  const onSelect = () => {
    setSelected(!selected);
  };

  const onSubmit = () => {
    mutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        updateUser({
          ...user,
          termsAccepted: true,
        });

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Thank you for acecpting our terms and conditions",
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      },
    });
  };

  return (
    <View style={tw`h-full items-center`}>
      <View style={tw`items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Terms and Conditions</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            By selecting “I agree” below, I have read and agree to the terms of
            use and acknowledge the privacy notice. I am at least 13 years of
            age.
          </Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between w-11/12 mt-auto mb-10 `}>
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
      </View>
    </View>
  );
};

export default AcceptTerms;
