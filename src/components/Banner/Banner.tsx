/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import BadgeButton from "@/components/BadgeButton";

interface BannerProps {
  title: string;
  cta: string;
  bgColor?: string;
  onPress?: () => void;
}

const Banner: React.FC<BannerProps> = ({ title, cta, onPress, bgColor = "bg-purple-200" }) => {
  return (
    <View style={tw.style(`rounded-[30px] relative overflow-hidden bg-opacity-65 ${bgColor}`)}>
      <View style={tw`px-8 py-6`}>
        <Text style={tw` text-2xl max-w-2/3 leading-normal `}>{title}</Text>
        <BadgeButton size="sm" style={tw`px-10 py-3 mt-10`} onPress={onPress}>
          {cta}
        </BadgeButton>
      </View>
      <View
        style={tw.style(`absolute w-16 h-44 -top-10 right-8 bg-purple-200 ${bgColor}`, {
          transform: [{ rotate: "30deg" }],
        })}
      />
      <View
        style={tw.style(`absolute w-16 h-44 -bottom-10 right-4 ${bgColor}`, {
          transform: [{ rotate: "30deg" }],
        })}
      />
    </View>
  );
};

export default Banner;
