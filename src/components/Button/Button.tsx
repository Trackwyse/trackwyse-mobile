import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, TouchableOpacityProps, View, ActivityIndicator } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

const buttonColorClasses = {
  primary: "bg-primary-200",
  secondary: "bg-gray-100",
};

const textColorClasses = {
  primary: "text-white",
  secondary: "text-black",
};

const sizeClasses = {
  sm: "p-3 w-full",
  lg: "p-5 w-full",
};

export interface ButtonProps extends TouchableOpacityProps {
  color?: "primary" | "secondary";
  size?: "sm" | "lg";
  iconLeft?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  style?: any;
  textStyle?: any;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  iconLeft,
  iconRight,
  style, // This is to prevent the style prop from being passed to the TouchableOpacity
  textStyle,
  color = "primary",
  size = "sm",
  loading = false,
  disabled = false,
  ...props
}) => {
  const buttonClassNames = tw.style(
    "flex flex-row justify-between font-medium relative rounded-2xl",
    !disabled && !loading ? buttonColorClasses[color] : "bg-gray-100",
    sizeClasses[size],
    style
  );

  const textClassNames = tw.style(
    "text-base font-medium",
    !disabled ? textColorClasses[color] : "text-gray-300",
    textStyle
  );

  return (
    <TouchableOpacity disabled={disabled || loading} style={buttonClassNames} {...props}>
      {iconLeft ? <Ionicons name={iconLeft} style={textClassNames} /> : <View />}
      <Text style={tw.style(textClassNames, loading ? "opacity-0" : "")}>{props.children}</Text>
      {loading && (
        <ActivityIndicator style={tw`absolute inset-0`} color={tw.color("primary-200")} />
      )}
      {iconRight ? <Ionicons name={iconRight} style={textClassNames} /> : <View />}
    </TouchableOpacity>
  );
};

export default Button;
