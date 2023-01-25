/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import lodash from "lodash";
import { SafeAreaView, ScrollView, View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { useCheckout } from "@/contexts/Checkout";
import CheckoutLoader from "@/components/Loaders/Checkout";

interface CheckoutScreenProps {}

const Checkout: React.FC<CheckoutScreenProps> = ({}) => {
  const { checkout, loading } = useCheckout();

  if (loading) return <CheckoutLoader />;

  console.log(checkout);

  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}>
          <View style={tw`mt-12 mb-8`}>
            <Text style={tw`font-bold text-3xl`}>Checkout</Text>
          </View>

          {lodash.isEmpty(checkout) && (
            <EmptyState
              title="Your Cart is Empty"
              subtitle="You have not added any items to your cart yet. Checkout our Store!"
            />
          )}

          {/* {!lodash.isEmpty(checkout) && (

          )} */}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Checkout;
