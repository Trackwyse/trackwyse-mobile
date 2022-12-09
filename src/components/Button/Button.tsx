import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  StyleProp,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "../../lib/tailwind";

const buttonColorClasses = {
  primary: "bg-primary-200 text-white",
  secondary: "bg-gray-200 text-black",
};

const textColorClasses = {
  primary: "text-white",
  secondary: "text-black",
};

const sizeClasses = {
  sm: "p-3 w-11/12",
  lg: "p-5 w-11/12",
};

export interface ButtonProps extends TouchableOpacityProps {
  color?: "primary" | "secondary";
  size?: "sm" | "lg";
  iconLeft?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  style: any;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  iconLeft,
  iconRight,
  style, // This is to prevent the style prop from being passed to the TouchableOpacity
  color = "primary",
  size = "sm",
  disabled = false,
  ...props
}) => {
  const buttonClassNames = tw.style(
    "flex flex-row justify-between font-medium",
    !disabled ? buttonColorClasses[color] : "bg-gray-200",
    sizeClasses[size],
    style
  );

  const textClassNames = tw.style(
    "text-base",
    !disabled ? textColorClasses[color] : "text-gray-300"
  );

  return (
    <TouchableOpacity disabled={disabled} style={buttonClassNames} {...props}>
      {iconLeft ? (
        <Ionicons name={iconLeft} style={textClassNames} />
      ) : (
        <View />
      )}
      <Text style={textClassNames}>{props.children}</Text>
      {iconRight ? (
        <Ionicons name={iconRight} style={textClassNames} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

export default Button;
