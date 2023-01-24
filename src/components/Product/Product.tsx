/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Image from "@/components/Image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ProductProps {
  product: Product;
}

type RootStackParamList = {
  StoreProduct: { productID: string } | undefined;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate("StoreProduct", { productID: product.id });
  };

  return (
    <TouchableOpacity style={tw`w-[48%]`} onPress={onPress}>
      <View style={tw`h-44 p-5 bg-gray-100 rounded-lg items-center justify-center`}>
        <View style={tw`h-full w-full`}>
          <Image
            source={{ uri: product.thumbnail.url }}
            resizeMode="contain"
            style={tw`h-full w-full`}
          />
        </View>
      </View>
      <Text style={tw`text-base font-medium mt-4`}>{product.name}</Text>
      <Text style={tw`text-sm text-black`}>
        {product.variants[0].channelListings[0].price.amount}
        <Text style={tw`text-xs text-gray-400`}>
          {" " + product.variants[0].channelListings[0].price.currency}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default Product;
