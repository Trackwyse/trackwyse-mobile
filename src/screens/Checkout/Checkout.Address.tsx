/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { SafeAreaView, ScrollView } from "react-native";

import tw from "@/lib/tailwind";
import Container from "@/components/Container";

interface CheckoutScreenProps {}

const Checkout: React.FC<CheckoutScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}></ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Checkout;
