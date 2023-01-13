/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import Hyperlink from "@/components/Hyperlink";
import BadgeButton from "@/components/BadgeButton";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";
import useBottomSheetRef from "@/hooks/useBottomSheetRef";

const AcceptTerms: React.FC = () => {
  const { user, updateUser, accessToken } = useAuth();
  const [selected, setSelected] = useState<boolean>(false);
  const { open: openPrivacyPolicy, bottomSheetRef: privacyPolicyRef } = useBottomSheetRef();
  const { open: openTermsOfService, bottomSheetRef: termsOfServiceRef } = useBottomSheetRef();

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
      onSuccess: () => {
        updateUser({
          ...user,
          termsAccepted: true,
        });

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Thank you for accepting our terms and conditions",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      },
    });
  };

  return (
    <Container style={tw`h-full`}>
      <PrivacyPolicy innerRef={privacyPolicyRef} />
      <TermsOfService innerRef={termsOfServiceRef} />

      <Text variant="title">Terms and Conditions</Text>
      <Text variant="subtitle">
        By selecting "I Agree" below, I have read and agree to the terms and conditions and
        acknowledge the privacy notice. I am at least 13 years of age.
      </Text>

      <Hyperlink textStyle={tw`my-1 text-base`} onPress={openTermsOfService}>
        Terms and Conditions
      </Hyperlink>
      <Hyperlink textStyle={tw`my-1 text-base`} onPress={openPrivacyPolicy}>
        Privacy Notice
      </Hyperlink>

      <View style={tw`flex-row justify-between mt-auto mb-10 `}>
        <BadgeButton
          size="lg"
          onPress={onSelect}
          disabled={selected}
          iconRight={selected ? "checkmark-done-outline" : "checkmark-outline"}
        >
          I Agree
        </BadgeButton>
        <BadgeButton size="lg" iconRight="arrow-forward" disabled={!selected} onPress={onSubmit}>
          Finish
        </BadgeButton>
      </View>
    </Container>
  );
};

export default AcceptTerms;
