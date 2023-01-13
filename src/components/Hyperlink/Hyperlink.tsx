/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

interface HyperlinkProps extends TouchableOpacityProps {
  textStyle?: any;
}

const Hyperlink: React.FC<HyperlinkProps> = ({ textStyle, ...props }) => {
  const textColorClasses = tw.style(
    "underline",
    props.disabled ? "text-gray-100" : "text-primary-200",
    textStyle
  );

  return (
    <TouchableOpacity {...props}>
      <Text style={textColorClasses}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Hyperlink;
