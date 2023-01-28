/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { SafeAreaView } from "react-native";

import Text from "@/components/Text";
import Container from "@/components/Container";

interface CartScreenProps {}

const Cart: React.FC<CartScreenProps> = () => {
  // TODO: Add a button to navigate to the transaction directly (ProfileTransaction {screenProps: {transactionId: transaction.id}}}})
  return (
    <SafeAreaView>
      <Container>
        <Text variant="title">Order Received</Text>
        <Text variant="subtitle">
          Thank you for your order! We have received your order and will get to work on shipping it!
          You can view the status of your order by navigating to your profile and viewing
          transactions
        </Text>
      </Container>
    </SafeAreaView>
  );
};

export default Cart;
