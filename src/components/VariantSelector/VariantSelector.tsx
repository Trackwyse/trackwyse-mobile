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
import { TouchableOpacity, View } from "react-native";

import Text from "@/components/Text";
import Container from "@/components/Container";
import tw from "@/lib/tailwind";
import Chip from "../Chip";

interface VariantSelectorProps {
  innerRef: React.RefObject<BottomSheetModal>;
  variants: Variant[];
  selectedVariant: number;
  setSelectedVariant: (value: number) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  innerRef,
  selectedVariant,
  setSelectedVariant,
}) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const handleVariantSelect = (index: number) => {
    setSelectedVariant(index);
    innerRef.current?.close();
  };

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView>
        <Container style={tw`mt-4`}>
          {variants.map((variant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVariantSelect(index)}
              style={tw` py-4 flex-row justify-between items-center w-full `}
            >
              <View>
                <Text style={tw`font-semibold text-base`}>{variant.name}</Text>
                <Text style={tw`text-base text-gray-400`}>
                  ${variant.channelListings[0].price.amount}
                </Text>
              </View>

              {selectedVariant === index && <Chip label=" Selected" style={tw`bg-primary-200`} />}
            </TouchableOpacity>
          ))}
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

export default VariantSelector;
