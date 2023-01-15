/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, TextInputProps, TouchableWithoutFeedback, View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

const sizeClasses = {
  sm: "h-12",
  lg: "h-16",
};

// Disable font scaling on all TextInput components
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

export interface InputProps extends TextInputProps {
  size?: "sm" | "lg";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  style,
  error,
  size = "sm",
  disabled = false,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const containerColorClasses = tw.style(
    "flex-row items-center w-full bg-gray-100 px-4 border-2  rounded-2xl",
    error && "border-red",
    !error && isFocused && "border-black",
    !error && !isFocused && "border-gray-100",
    style
  );

  const textColorClasses = tw.style(disabled && "text-gray-300", !disabled && "text-black");

  const placeholderTextColor = tw.color(disabled ? "gray-300" : "gray-400");

  const onContainerPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={onContainerPress}>
        <View style={containerColorClasses}>
          {icon && <Ionicons name={icon} size={30} style={textColorClasses} />}
          <TextInput
            ref={inputRef}
            editable={!disabled}
            style={tw.style(
              `px-2 text-lg leading-[26px] w-full font-regular`,
              sizeClasses[size],
              textColorClasses
            )}
            placeholderTextColor={placeholderTextColor}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            {...props}
          />
        </View>
      </TouchableWithoutFeedback>
      {error && <Text style={tw`text-red mt-1 mb-2`}>{error}</Text>}
    </View>
  );
};

export default Input;
