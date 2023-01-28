/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import lodash from "lodash";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardFormView, useConfirmPayment } from "@stripe/stripe-react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import InfoCard from "@/components/InfoCard";
import Container from "@/components/Container";
import { useCheckout } from "@/contexts/Checkout";
import CardSelector from "@/components/CardSelector";
import useBottomSheetRef from "@/hooks/useBottomSheetRef";
import ShippingSelector from "@/components/ShippingSelector";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EmptyState from "@/components/EmptyState";

interface CheckoutScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Checkout: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const { confirmPayment } = useConfirmPayment();
  const { checkout, setCheckout } = useCheckout();

  const { open: openShippingSelector, bottomSheetRef } = useBottomSheetRef();
  const { open: openCardSelector, bottomSheetRef: cardSelectorRef } = useBottomSheetRef();

  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardFormView.Details | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<number | null>(null);

  const createPaymentIntentMutation = useMutation({
    mutationFn: () => {
      return api.createPaymentIntent(accessToken);
    },
  });

  const completePaymentMutation = useMutation({
    mutationFn: () => {
      return api.completePayment(accessToken);
    },
  });

  const isButtonDisabled =
    lodash.isEmpty(checkout.shippingAddress) ||
    lodash.isEmpty(checkout.billingAddress) ||
    checkout.deliveryMethod === null ||
    cardDetails === null;

  const onCompletePurchase = async () => {
    setLoading(true);
    createPaymentIntentMutation.mutate(undefined, {
      onSuccess: () => {
        completePaymentMutation.mutate(undefined, {
          onSuccess: async ({ data }) => {
            console.log(data);
            const clientSecret = JSON.parse(data.confirmationData as string).client_secret;

            confirmPayment(clientSecret, {
              paymentMethodType: "Card",
            }).then((result) => {
              const { error, paymentIntent } = result;

              if (error) {
                console.log(error);
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "There was an error processing your payment",
                });
                setLoading(false);
              } else {
                setTimeout(() => {
                  completePaymentMutation.mutate(undefined, {
                    onSuccess: async () => {
                      navigation.navigate("CartComplete");
                      setCheckout({} as Checkout);
                      setLoading(false);
                    },
                    onError: () => {
                      Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "There was an error processing your payment",
                      });
                      setLoading(false);
                    },
                  });
                }, 1000);
              }
            });
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "There was an error processing your payment",
            });
            setLoading(false);
          },
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "There was an error processing your payment",
        });
        setLoading(false);
      },
    });
  };

  if (lodash.isEmpty(checkout))
    return (
      <EmptyState
        title="Your Cart is Empty"
        subtitle="You have not added any items to your cart yet. Checkout our Store!"
      />
    );

  return (
    <SafeAreaView>
      <ShippingSelector
        innerRef={bottomSheetRef}
        shippingMethods={checkout.shippingMethods}
        selectedMethod={selectedShippingMethod}
        setSelectedMethod={setSelectedShippingMethod}
      />
      <CardSelector
        innerRef={cardSelectorRef}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`w-full h-full`}
          contentContainerStyle={tw`pb-10`}
        >
          <Text style={tw`text-lg font-semibold mt-10`}>Delivery Information</Text>
          <InfoCard
            pressable
            style={tw`mt-4`}
            iconLeft="location-sharp"
            iconRight="md-chevron-forward"
            onPress={() => navigation.navigate("CartAddress")}
            title={checkout.shippingAddress.address1 || "No Shipping Address"}
            subtitle={
              lodash.isEmpty(checkout.shippingAddress)
                ? "Enter your shipping address"
                : checkout.shippingAddress.city +
                  ", " +
                  checkout.shippingAddress.state +
                  " " +
                  checkout.shippingAddress.zip5
            }
          />
          <InfoCard
            pressable
            style={tw`mt-4`}
            iconLeft="cube"
            iconRight="md-chevron-forward"
            onPress={openShippingSelector}
            title={"Shipping Method"}
            subtitle={
              (selectedShippingMethod !== null &&
                checkout.shippingMethods[selectedShippingMethod].name) ||
              (checkout.deliveryMethod !== null && checkout.deliveryMethod.name) ||
              "Select Shipping Method"
            }
          />

          <Text style={tw`text-lg font-semibold mt-10`}>Billing Information</Text>
          <InfoCard
            pressable
            style={tw`mt-4`}
            iconLeft="location-sharp"
            iconRight="md-chevron-forward"
            onPress={() => navigation.navigate("CartBillingAddress")}
            title={checkout.billingAddress.address1 || "No Billing Address"}
            subtitle={
              lodash.isEmpty(checkout.billingAddress)
                ? "Enter your billing address"
                : checkout.billingAddress.city +
                  ", " +
                  checkout.billingAddress.state +
                  " " +
                  checkout.billingAddress.zip5
            }
          />
          <InfoCard
            pressable
            iconLeft="card"
            style={tw`mt-4`}
            title={cardDetails ? cardDetails.brand : "Credit Card"}
            subtitle={cardDetails ? `****-${cardDetails.last4}` : "Enter your payment information"}
            iconRight="md-chevron-forward"
            onPress={openCardSelector}
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

          <Button
            style={tw`mt-8`}
            size="lg"
            loading={loading}
            disabled={isButtonDisabled}
            onPress={onCompletePurchase}
          >
            Complete Purchase (${checkout.totalPrice.gross.amount})
          </Button>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Checkout;
