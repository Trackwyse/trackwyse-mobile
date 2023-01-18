/*
 * Created on Mon Jan 16 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView, View } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import Transaction from "@/components/Transaction";
import useRefreshControl from "@/hooks/useRefreshControl";
import TransactionsLoader from "@/components/Loaders/Transactions";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { accessToken } = useAuth();
  const { refreshing, onRefresh } = useRefreshControl();

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: () => {
      return api.getUserTransactions({}, accessToken);
    },
  });

  if (transactionsQuery.isLoading)
    return (
      <View>
        <TransactionsLoader />
      </View>
    );

  return (
    <View>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-5 h-full`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh(transactionsQuery.refetch)}
            />
          }
        >
          {transactionsQuery.data?.data?.transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ))}
        </ScrollView>
      </Container>
    </View>
  );
};

export default Profile;
