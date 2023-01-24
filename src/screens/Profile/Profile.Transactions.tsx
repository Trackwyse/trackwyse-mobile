/*
 * Created on Mon Jan 16 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
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
        contentContainerStyle={tw`pb-10 min-h-full`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(transactionsQuery.refetch)}
          />
        }
      >
        {!transactionsQuery.data?.pages[0].data.transactions.length && (
          <EmptyState
            title="No Purchases"
            subtitle="You have not created any purchases yet. Checkout our Store!"
          />
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
