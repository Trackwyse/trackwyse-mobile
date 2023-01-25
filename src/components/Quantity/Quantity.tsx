/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import IconButton from "@/components/IconButton";

interface QuantityProps {
  quantity: number;
  disabled?: boolean;
  setQuantity: (quantity: number) => void;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, setQuantity, disabled = false }) => {
  const updateQuantity = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <View style={tw.style(`flex-row items-center`, disabled && "opacity-40")}>
      <IconButton
        disabled={disabled}
        icon="remove"
        filled
        size={16}
        onPress={() => updateQuantity(quantity - 1)}
      />
      <Text style={tw`text-lg font-medium mx-3`}>{quantity}</Text>
      <IconButton
        disabled={disabled}
        icon="add"
        filled
        size={16}
        onPress={() => updateQuantity(quantity + 1)}
      />
    </View>
  );
};

export default Quantity;
