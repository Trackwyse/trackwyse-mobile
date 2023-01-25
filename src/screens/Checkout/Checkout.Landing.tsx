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
import CartItem from "@/components/CartItem";
import InfoCard from "@/components/InfoCard";
import Button from "@/components/Button";

interface CheckoutScreenProps {}

const Checkout: React.FC<CheckoutScreenProps> = ({}) => {
  const { checkout, loading } = useCheckout();

  if (loading) return <CheckoutLoader />;

  console.log(checkout);

  return (
    <SafeAreaView>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`w-full h-full`}
          contentContainerStyle={tw`pb-10`}
        >
          <View style={tw`mt-12 mb-8`}>
            <Text style={tw`font-bold text-3xl`}>Checkout</Text>
          </View>

          {lodash.isEmpty(checkout) && (
            <EmptyState
              title="Your Cart is Empty"
              subtitle="You have not added any items to your cart yet. Checkout our Store!"
            />
          )}

          {!lodash.isEmpty(checkout) && (
            <View>
              {checkout.lines.map((line, index) => (
                <CartItem key={index} cartItem={line} />
              ))}

              <Text style={tw`text-lg font-semibold mt-10`}>Delivery Information</Text>
              <InfoCard
                style={tw`mt-4`}
                pressable
                iconRight="md-chevron-forward"
                iconLeft="location-sharp"
                title={checkout.shippingAddress.address1 || "No Address"}
                subtitle={
                  checkout.shippingAddress.city +
                  ", " +
                  checkout.shippingAddress.state +
                  " " +
                  checkout.shippingAddress.zip5
                }
              />

              <Text style={tw`text-lg font-semibold mt-10`}>Billing Information</Text>
              <InfoCard
                style={tw`mt-4`}
                pressable
                iconRight="md-chevron-forward"
                iconLeft="card"
                title="VISA Classic"
                subtitle="****-1234"
              />

              <Text style={tw`text-lg font-semibold mt-10`}>Order Information</Text>
              <View style={tw`flex-row justify-between mt-4 items-center`}>
                <Text variant="subtitle" disableDefaultPadding>
                  Subtotal
                </Text>
                <Text variant="subtitle" style={tw`text-primary-200`} disableDefaultPadding>
                  ${checkout.subtotalPrice.gross.amount}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-4 items-center`}>
                <Text variant="subtitle" disableDefaultPadding>
                  Shipping
                </Text>
                <Text variant="subtitle" style={tw`text-primary-200`} disableDefaultPadding>
                  ${checkout.shippingPrice.gross.amount}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-6 items-center`}>
                <Text variant="subtitle" disableDefaultPadding>
                  Total
                </Text>
                <Text variant="subtitle" style={tw`text-xl text-primary-200`} disableDefaultPadding>
                  ${checkout.totalPrice.gross.amount}
                </Text>
              </View>

              <Button style={tw`mt-8`} size="lg">
                Complete Purchase (${checkout.totalPrice.gross.amount})
              </Button>
            </View>
          )}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Checkout;
