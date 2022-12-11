import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "../../lib/tailwind";

const buttonColorClasses = {
  primary: "bg-primary-200 text-white",
  secondary: "bg-gray-200 text-black",
};

const textColorClasses = {
  primary: "text-white",
  secondary: "text-black font-medium",
};

const sizeClasses = {
  sm: "p-3",
  lg: "py-4 px-5",
};

export interface BadgeButtonProps extends TouchableOpacityProps {
  color?: "primary" | "secondary";
  size?: "sm" | "lg";
  iconLeft?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
}

const BadgeButton: React.FC<BadgeButtonProps> = ({
  iconLeft,
  iconRight,
  color = "primary",
  size = "sm",
  loading = false,
  disabled = false,
  ...props
}) => {
  const buttonClassNames = tw.style(
    "flex self-start flex-row justify-between font-medium rounded-full", // Default classes
    !disabled && !loading ? buttonColorClasses[color] : "bg-gray-100", // Background colors
    sizeClasses[size] // Size
  );

  const textClassNames = tw.style(
    "text-lg",
    !disabled ? textColorClasses[color] : "text-gray-300"
  );

  return (
    <TouchableOpacity disabled={disabled} style={buttonClassNames} {...props}>
      {iconLeft && (
        <Ionicons name={iconLeft} style={tw.style("mr-3", textClassNames)} />
      )}

      <Text style={tw.style(textClassNames, loading ? "opacity-0" : "")}>
        {props.children}
      </Text>

      {loading && (
        <ActivityIndicator
          style={tw`absolute inset-0`}
          color={tw.color("primary-200")}
        />
      )}

      {iconRight && (
        <Ionicons name={iconRight} style={tw.style("ml-3", textClassNames)} />
      )}
    </TouchableOpacity>
  );
};

export default BadgeButton;
