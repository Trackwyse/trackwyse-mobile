/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { SafeAreaView, ScrollView, View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";

interface CheckoutScreenProps {}

const Checkout: React.FC<CheckoutScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}>
          <View style={tw`mt-12 mb-8`}>
            <Text style={tw`font-bold text-3xl`}>Checkout</Text>
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Checkout;
