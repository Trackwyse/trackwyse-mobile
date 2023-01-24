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

interface StoreScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Store: React.FC<StoreScreenProps> = ({ route, navigation }) => {
  const { productID } = route.params;

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

  const description = JSON.parse(product?.description).blocks[0].data.text;

  return (
    <View>
      <View style={tw`bg-gray-100 w-full h-2/5 relative`}>
        <SafeAreaView>
          <Container>
            <IconButton
              filled
              color="white"
              icon="arrow-back"
              style={tw`my-4`}
              size={22}
              fillColor={tw.color("primary-200")}
              onPress={() => navigation.goBack()}
            />
          </Container>
        </SafeAreaView>
        <View style={tw`absolute w-full h-full justify-center items-center`}>
          <View style={tw`w-64`}>
            <Image
              source={{ uri: product.media[0].url }}
              resizeMode="contain"
              style={tw`h-full w-full`}
            />
          </View>
        </View>
      </View>
      <SafeAreaView>
        <Container>
          <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}>
            <View style={tw`flex-row justify-between`}>
              <Text variant="title" style={tw`font-medium max-w-4/5`}>
                {product.name}
              </Text>
              <Text variant="title">$ {product.variants[0].channelListings[0].price.amount}</Text>
            </View>
            <Text variant="subtitle">{description}</Text>
          </ScrollView>
        </Container>
      </SafeAreaView>
    </View>
  );
};

export default Store;
