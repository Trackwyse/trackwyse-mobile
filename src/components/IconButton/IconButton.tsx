import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 25,
  color = "black",
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
