/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import tw from "@/lib/tailwind";
import { TextPropsIOS, Text as RNText } from "react-native";

const textVariantStyles = {
  default: "font-regular",
  title: "text-2xl font-bold",
  subtitle: "text-gray-400 text-base",
  premium_title: "text-2xl font-medium",
  premium_subtitle: "text-gray-400 text-base",
};

const textVariantPaddings = {
  default: "",
  title: "pt-10",
  subtitle: "py-4",
  premium_title: "pt-10",
  premium_subtitle: "py-1",
};

interface TextProps extends TextPropsIOS {
  children: React.ReactNode;
  variant?: keyof typeof textVariantStyles;
  style?: any;
  disableDefaultPadding?: boolean;
}

const Text: React.FC<TextProps> = ({
  style,
  children,
  variant = "default",
  disableDefaultPadding = false,
  ...props
}) => {
  const textStyle = tw.style(
    textVariantStyles[variant],
    disableDefaultPadding ? "" : textVariantPaddings[variant],
    style
  );

  // <Text style={tw`text-2xl font-bold pt-10`}>Add a Label</Text>
  // <Text style={tw`my-4 text-gray-400 text-base`}>
  //   To get started, scan the QR code on one of your labels.
  // </Text>
  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
