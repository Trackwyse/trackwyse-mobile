/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

const typeClasses = {
  error: "bg-red",
  success: "bg-green-400",
  warning: "bg-orange-400",
};

interface ChipProps {
  label: string;
  style?: any;
  type?: "error" | "success" | "warning";
}

const Chip: React.FC<ChipProps> = ({ style, label, type = "success" }) => {
  const chipClasses = tw.style("rounded-full px-4 py-1", typeClasses[type], style);

  return (
    <View style={chipClasses}>
      <Text style={tw`text-white`}>{label}</Text>
    </View>
  );
};

export default Chip;
