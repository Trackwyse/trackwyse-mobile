/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import IconButton from "@/components/IconButton";
import useAuthenticatedQuery from "@/hooks/useAuthenticatedQuery";
import ProductLoader from "@/components/Loaders/Product";
import ImageCarousel from "@/components/ImageCarousel";
import InfoCard from "@/components/InfoCard";
import { useState } from "react";
import Quantity from "@/components/Quantity";
import Button from "@/components/Button";

interface StoreScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Store: React.FC<StoreScreenProps> = ({ route, navigation }) => {
  const { productID } = route.params;
  const [quantity, setQuantity] = useState(1);

  const productDetailsQuery = useAuthenticatedQuery({
    queryKey: ["productDetails", productID],
    queryFn: ({ queryKey }) => {
      const [accessToken] = queryKey;

      return api.getStoreProduct({ id: productID }, accessToken);
    },
  });

  const product = productDetailsQuery.data?.data.product;

  if (productDetailsQuery.isLoading) return <ProductLoader />;

  if (!product)
    return (
      <Container>
        <Text variant="title">No Product Found</Text>
      </Container>
    );

  const description = JSON.parse(product?.description).blocks[0].data.text; // UPDATE THIS

  return (
    <View style={tw`flex-1`}>
      <View style={tw`bg-gray-100 w-full h-1/2`}>
        <SafeAreaView style={tw`z-10`}>
          <Container>
            <IconButton
              filled
              color="white"
              icon="arrow-back"
              style={tw`my-4 z-10`}
              size={22}
              fillColor={tw.color("primary-200")}
              onPress={() => navigation.goBack()}
            />
          </Container>
        </SafeAreaView>
        <ImageCarousel images={product.images.map((image) => image.url)} />
      </View>

      <ScrollView
        style={tw`w-full h-full`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-5`}
      >
        <Container>
          <View style={tw`flex-row justify-between`}>
            <Text variant="title" style={tw`font-medium max-w-4/5`}>
              {product.name}
            </Text>
            <Text variant="title">${product.variants[0].channelListings[0].price.amount}</Text>
          </View>
          <Text variant="subtitle">{description}</Text>

          <InfoCard
            pressable
            title="Color Options"
            subtitle="Current: Navy Blue"
            iconLeft="color-palette"
            iconRight="chevron-forward"
            style={tw`mt-4`}
          />
          <InfoCard
            title="Quantity"
            subtitle="Adjust quantity"
            iconLeft="information-circle"
            style={tw`mt-4`}
            componentRight={<Quantity quantity={quantity} setQuantity={setQuantity} />}
          />
          <Button style={tw`mt-8`} size="lg">
            Add {quantity} Item(s) to Cart
          </Button>
        </Container>
      </ScrollView>
    </View>
  );
};

export default Store;
