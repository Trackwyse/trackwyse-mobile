/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacityProps, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  filled?: boolean;
  fillColor?: string;
  pressable?: boolean;
  style?: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 25,
  color = "black",
  filled = false,
  fillColor = tw.color("gray-100"),
  pressable = true,
  style,
  ...props
}) => {
  const containerClasses = tw.style(
    filled && "rounded-full p-3 self-start",
    filled && { backgroundColor: fillColor },
    style
  );

  return (
    <View>
      <TouchableOpacity disabled={!pressable} style={containerClasses} {...props}>
        <View style={tw.style(`items-center justify-center`, { width: size, height: size })}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
