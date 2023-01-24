/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, RefreshControl, SafeAreaView, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Product from "@/components/Product";
import Container from "@/components/Container";
import StoreLoader from "@/components/Loaders/Store";
import useRefreshControl from "@/hooks/useRefreshControl";

interface StoreScreenProps {}

const Store: React.FC<StoreScreenProps> = ({}) => {
  const { accessToken } = useAuth();
  const { refreshing, onRefresh } = useRefreshControl();

  const productsQuery = useInfiniteQuery({
    queryKey: ["products", accessToken],
    queryFn: ({ pageParam }) => {
      return api.getStoreProducts({ after: pageParam }, accessToken);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.pageInfo.hasNextPage ? lastPage.data.pageInfo.endCursor : undefined;
    },
  });

  const products = productsQuery.data?.pages.map((page) => page.data.products).flat();

  if (productsQuery.isLoading) return <StoreLoader />;

  return (
    <SafeAreaView>
      <Container>
        <FlatList
          data={products}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={tw`h-4`} />}
          columnWrapperStyle={tw`justify-between`}
          style={tw`h-full`}
          contentContainerStyle={tw`pb-10 min-h-full`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeaderComponent />}
          renderItem={({ item }) => <Product product={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh(productsQuery.refetch)}
            />
          }
          ListFooterComponent={() =>
            productsQuery.hasNextPage ? (
              <Button
                loading={productsQuery.isFetchingNextPage}
                style={tw`mt-5`}
                onPress={() => productsQuery.fetchNextPage()}
              >
                Load more
              </Button>
            ) : null
          }
        />
      </Container>
    </SafeAreaView>
  );
};

const ListHeaderComponent = () => {
  return (
    <View style={tw`mt-12 mb-8`}>
      <Text style={tw`font-bold text-3xl`}>Shopping</Text>
    </View>
  );
};

export default Store;
