/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";
import Swiper from "react-native-swiper";

import tw from "@/lib/tailwind";
import Image from "@/components/Image";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Swiper loop={false} activeDotColor={tw.color("primary-200")}>
      {images.map((image, index) => (
        <ImageItem key={index} image={image} />
      ))}
    </Swiper>
  );
};

interface ImageItemProps {
  image: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  return (
    <View style={tw`absolute w-full h-full justify-center items-center`}>
      <View style={tw`w-64 mb-20`}>
        <Image source={{ uri: image }} resizeMode="contain" style={tw`h-full w-full`} />
      </View>
    </View>
  );
};

export default ImageCarousel;
