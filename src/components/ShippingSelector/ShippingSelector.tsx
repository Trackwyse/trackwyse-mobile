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
import { useMutation } from "@tanstack/react-query";
import { TouchableOpacity, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Chip from "@/components/Chip";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { useCheckout } from "@/contexts/Checkout";

interface ShippingSelectorProps {
  innerRef: React.RefObject<BottomSheetModal>;
  shippingMethods: ShippingMethod[];
  selectedMethod: number | null;
  setSelectedMethod: (value: number) => void;
}

const ShippingSelector: React.FC<ShippingSelectorProps> = ({
  shippingMethods,
  innerRef,
  selectedMethod,
  setSelectedMethod,
}) => {
  const { accessToken } = useAuth();
  const snapPoints = useMemo(() => ["50%"], []);
  const { setCheckout, checkout } = useCheckout();

  const mutation = useMutation({
    mutationFn: (values: UpdateDeliveryMethodInput) => {
      return api.updateDeliveryMethod(values, accessToken);
    },
  });

  const handleVariantSelect = (index: number) => {
    mutation.mutate(
      {
        shippingMethodId: shippingMethods[index].id,
      },
      {
        onSuccess: ({ data }) => {
          setCheckout({
            ...checkout,
            ...data.checkout,
          });
        },
      }
    );
    setSelectedMethod(index);
    innerRef.current?.close();
  };

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView>
        <Container style={tw`mt-4`}>
          {shippingMethods.length === 0 && (
            <EmptyState title="Invalid Address" subtitle="We cannot ship to this location" />
          )}
          {shippingMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVariantSelect(index)}
              style={tw` py-4 flex-row justify-between items-center w-full `}
            >
              <View>
                <Text style={tw`font-semibold text-base`}>{method.name}</Text>
                <Text style={tw`text-base text-gray-400`}>${method.price.amount}</Text>
              </View>

              {selectedMethod === index && <Chip label=" Selected" style={tw`bg-primary-200`} />}
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

export default ShippingSelector;
