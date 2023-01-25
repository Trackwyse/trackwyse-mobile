/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import Text from "@/components/Text";
import Image from "@/components/Image";
import { useAuth } from "@/contexts/Auth";
import Quantity from "@/components/Quantity";
import IconButton from "@/components/IconButton";
import { useCheckout } from "@/contexts/Checkout";
import tw from "@/lib/tailwind";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { accessToken } = useAuth();
  const { checkout, setCheckout } = useCheckout();

  const removeItemMutation = useMutation({
    mutationFn: () => {
      return api.removeProductFromStoreCheckout({ lineId: cartItem.id }, accessToken);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: (quantity: number) => {
      return api.updateProductInStoreCheckout({ lineId: cartItem.id, quantity }, accessToken);
    },
  });

  const handleRemoveItem = () => {
    removeItemMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        setCheckout({
          ...checkout,
          ...data.checkout,
        });
      },
    });
  };

  // TODO: Make this faster
  const handleUpdateItem = (quantity: number) => {
    updateItemMutation.mutate(quantity, {
      onSuccess: ({ data }) => {
        setCheckout({
          ...checkout,
          ...data.checkout,
        });
      },
    });
  };

  return (
    <View style={tw`flex-row w-full mb-2`}>
      <View style={tw`w-36 h-36 py-4 px-6 rounded-md bg-gray-100`}>
        <Image
          source={{
            uri: cartItem?.variant?.images[0]?.url
              ? cartItem.variant.images[0].url
              : "https://i.picsum.photos/id/263/200/200.jpg",
          }}
          resizeMode="contain"
          style={tw`w-full h-full`}
        />
      </View>
      <View style={tw`justify-between ml-4 shrink w-full`}>
        <View>
          <Text style={tw`font-semibold text-base`}>{cartItem.variant.name}</Text>
          <Text style={tw`text-base text-gray-500`}>
            ${cartItem.totalPrice.net.amount} (${cartItem.totalPrice.tax.amount} tax)
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Quantity
            quantity={cartItem.quantity}
            setQuantity={handleUpdateItem}
            disabled={updateItemMutation.isLoading}
          />
          <IconButton icon="trash" size={16} filled onPress={handleRemoveItem} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;
