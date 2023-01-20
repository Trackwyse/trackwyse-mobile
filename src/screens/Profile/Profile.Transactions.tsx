/*
 * Created on Mon Jan 16 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import Transaction from "@/components/Transaction";
import useRefreshControl from "@/hooks/useRefreshControl";
import TransactionsLoader from "@/components/Loaders/Transactions";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { accessToken } = useAuth();
  const { refreshing, onRefresh } = useRefreshControl();

  const transactionsQuery = useInfiniteQuery({
    queryKey: ["transactions", accessToken],
    queryFn: ({ pageParam }) => {
      return api.getUserTransactions({ after: pageParam }, accessToken);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.pageInfo.hasNextPage ? lastPage.data.pageInfo.endCursor : undefined;
    },
  });

  if (transactionsQuery.isLoading) return <TransactionsLoader />;

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`h-full`}
        contentContainerStyle={tw`pb-20`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(transactionsQuery.refetch)}
          />
        }
      >
        {!transactionsQuery.data?.pages[0].data.transactions.length && (
          <View>
            <Text variant="title">No Transactions</Text>
            <Text variant="subtitle">You have not completed any purchases yet</Text>
          </View>
        )}

        {transactionsQuery.data?.pages.map((page, index) => {
          return page.data.transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ));
        })}

        {transactionsQuery.hasNextPage && (
          <Button
            loading={transactionsQuery.isFetchingNextPage}
            style={tw`mt-5`}
            onPress={() => transactionsQuery.fetchNextPage()}
          >
            Load More
          </Button>
        )}
      </ScrollView>
    </Container>
  );
};

export default Profile;
