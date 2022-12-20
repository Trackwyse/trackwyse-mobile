import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import tw from "../../lib/tailwind";

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  filled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 25,
  color = "black",
  filled = false,
  ...props
}) => {
  const containerClasses = tw.style(filled && "rounded-full p-3 bg-gray-100");

  return (
    <TouchableOpacity style={containerClasses} {...props}>
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
