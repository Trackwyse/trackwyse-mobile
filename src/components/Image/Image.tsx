/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import {
  View,
  ActivityIndicator,
  Image as RNImage,
  ImageProps as RNImageProps,
} from "react-native";
import { useState } from "react";

import tw from "@/lib/tailwind";

interface ImageProps extends RNImageProps {
  style?: any;
}

const Image: React.FC<ImageProps> = ({ style, ...props }) => {
  const [loading, setLoading] = useState(false);

  const imageClasses = tw.style(loading ? "opacity-0" : "opacity-100", style);

  return (
    <View style={tw`w-full h-full`}>
      <RNImage
        style={imageClasses}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        {...props}
      />
      <ActivityIndicator
        size="large"
        color={tw.color("gray-400")}
        style={tw.style(
          loading ? "opacity-100" : "opacity-0",
          "absolute",
          "z-10",
          "w-full",
          "h-full",
          "justify-center",
          "items-center"
        )}
      />
    </View>
  );
};

export default Image;
