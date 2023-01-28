/*
 * Created on Thu Jan 26 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

/*
 * Created on Wed Jan 25 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { View } from "react-native";
import { CardForm, CardFormView } from "@stripe/stripe-react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";

interface CardSelectorProps {
  innerRef: React.RefObject<BottomSheetModal>;
  cardDetails: CardFormView.Details | null;
  setCardDetails: (cardDetails: CardFormView.Details | null) => void;
}

const CardSelector: React.FC<CardSelectorProps> = ({ innerRef, cardDetails, setCardDetails }) => {
  const snapPoints = useMemo(() => ["85%"], []);

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView>
        <Container style={tw`mt-4`}>
          <Text variant="title" disableDefaultPadding>
            Card Details
          </Text>
          <Text variant="subtitle" disableDefaultPadding style={tw`mt-2`}>
            Please enter your payment information below. All payments are processed through Stripe
            and your information will not be saved.
          </Text>
          <CardForm
            placeholders={{
              number: "1234 1234 1234 1234",
            }}
            cardStyle={{
              borderWidth: 1,
              borderColor: tw.color("gray-100"),
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
              placeholderColor: tw.color("gray-400"),
            }}
            style={{
              width: "100%",
              height: "100%",
              marginVertical: 30,
            }}
            onFormComplete={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000",
        opacity: 0.5,
      },
    ],
    [style]
  );

  return <View style={containerStyle}></View>;
};

export default CardSelector;
