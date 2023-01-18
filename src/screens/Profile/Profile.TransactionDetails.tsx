/*
 * Created on Wed Jan 18 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { getSaleorAddressString } from "@/lib/textUtil";
import useRefreshControl from "@/hooks/useRefreshControl";
import TransactionsLoader from "@/components/Loaders/Transactions";
import { convertDateToReadable, convertDateToTimePassed } from "@/lib/dateUtil";
import { EventStatusMessages, TransactionStatusMessages } from "@/lib/constants";

interface ProfileScreenProps {
  route: any;
}

const Profile: React.FC<ProfileScreenProps> = ({ route }) => {
  const { accessToken } = useAuth();
  const { transactionID } = route.params;
  const { refreshing, onRefresh } = useRefreshControl();

  const transactionDetailsQuery = useQuery({
    queryKey: ["transactionDetails", transactionID],
    queryFn: () => {
      return api.getUserTransaction({ id: transactionID }, accessToken);
    },
  });

  const transaction = transactionDetailsQuery.data?.data.transaction;

  if (transactionDetailsQuery.isLoading) return <TransactionsLoader />;

  if (!transaction)
    return (
      <Container>
        <Text variant="title">No Transaction Found</Text>
      </Container>
    );

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`h-full`}
        contentContainerStyle={tw`pb-20`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(transactionDetailsQuery.refetch)}
          />
        }
      >
        <Text variant="title">Order Information</Text>
        <Text variant="subtitle">View the details of your order</Text>
        <ListItem title="Order ID" position="top" textBottom={transaction.id} />
        <ListItem
          title="Items"
          position="middle"
          textBottom={transaction.lines
            .map((line) => `${line.quantity}x ${line.productName}`)
            .join("\n")}
        />
        <ListItem
          title="Order Status"
          textRight={
            TransactionStatusMessages[transaction.status as keyof typeof TransactionStatusMessages]
              .chipMessage
          }
          position="middle"
        />
        <ListItem
          title="Placed On"
          position="middle"
          textRight={convertDateToReadable(transaction.created, false)}
        />
        <ListItem
          title="Subtotal"
          position="middle"
          textRight={`$${transaction.total.gross.amount}`}
        />
        <ListItem title="Taxes" position="middle" textRight={`$${transaction.total.tax.amount}`} />
        <ListItem title="Total" position="bottom" textRight={`$${transaction.total.net.amount}`} />

        <Text variant="title">Billing Information</Text>
        <Text variant="subtitle">View the billing information provided</Text>
        <ListItem
          title="Billing Address"
          textBottom={getSaleorAddressString(transaction.billingAddress)}
        />
        <ListItem
          title="Shipping Address"
          position="bottom"
          textBottom={getSaleorAddressString(transaction.shippingAddress)}
        />

        <Text variant="title">Order Updates</Text>
        <Text variant="subtitle">View live updates on your orders status.</Text>
        {transaction.events
          .slice(0)
          .reverse()
          .map((event, index) => {
            if (index === 0 && transaction.events.length === 1) {
              return (
                <ListItem
                  key={index}
                  title={"Order Update"}
                  textRight={convertDateToTimePassed(event.date)}
                  textBottom={EventStatusMessages[event.type as keyof typeof EventStatusMessages]}
                  position="alone"
                />
              );
            } else if (index === 0) {
              return (
                <ListItem
                  key={index}
                  title={"Order Update"}
                  textRight={convertDateToTimePassed(event.date)}
                  textBottom={EventStatusMessages[event.type as keyof typeof EventStatusMessages]}
                  position="top"
                />
              );
            } else if (index === transaction.events.length - 1) {
              return (
                <ListItem
                  key={index}
                  title={"Order Update"}
                  textRight={convertDateToTimePassed(event.date)}
                  textBottom={EventStatusMessages[event.type as keyof typeof EventStatusMessages]}
                  position="bottom"
                />
              );
            } else {
              return (
                <ListItem
                  key={index}
                  title={"Order Update"}
                  textRight={convertDateToTimePassed(event.date)}
                  textBottom={EventStatusMessages[event.type as keyof typeof EventStatusMessages]}
                  position="middle"
                />
              );
            }
          })}
      </ScrollView>
    </Container>
  );
};

export default Profile;
