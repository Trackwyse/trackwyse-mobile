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
    <TouchableOpacity disabled={!pressable} style={containerClasses} {...props}>
      <View style={{ width: size, height: size }}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
