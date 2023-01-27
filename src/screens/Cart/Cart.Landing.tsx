/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import lodash from "lodash";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { useCheckout } from "@/contexts/Checkout";
import CheckoutLoader from "@/components/Loaders/Checkout";

interface CartScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Cart: React.FC<CartScreenProps> = ({ navigation }) => {
  const { checkout, loading } = useCheckout();

  if (loading) return <CheckoutLoader />;

  return (
    <SafeAreaView>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`w-full h-full`}
          contentContainerStyle={tw`pb-10`}
        >
          <View style={tw`mt-12 mb-8`}>
            <Text style={tw`font-bold text-3xl`}>Shopping Cart</Text>
          </View>

          {(lodash.isEmpty(checkout) || lodash.isEmpty(checkout?.lines)) && (
            <EmptyState
              title="Your Cart is Empty"
              subtitle="You have not added any items to your cart yet. Checkout our Store!"
            />
          )}

          {!lodash.isEmpty(checkout) && !lodash.isEmpty(checkout?.lines) && (
            <View>
              {checkout.lines.map((line, index) => (
                <CartItem key={index} cartItem={line} />
              ))}

              <Text style={tw`text-lg font-semibold mt-10`}>Order Information</Text>
              <View style={tw`flex-row justify-between mt-4 items-center`}>
                <Text variant="subtitle" disableDefaultPadding>
                  Subtotal
                </Text>
                <Text variant="subtitle" style={tw`text-primary-200`} disableDefaultPadding>
                  ${checkout.subtotalPrice.gross.amount}
                </Text>
              </View>

              <Button
                style={tw`mt-8`}
                size="lg"
                disabled={lodash.isEmpty(checkout.lines)}
                onPress={() => navigation.navigate("CartCheckout")}
              >
                Continue to Checkout (${checkout.totalPrice.gross.amount})
              </Button>
            </View>
          )}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Cart;
