/*
 * Created on Mon Jan 16 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Chip from "@/components/Chip";
import { trimToLength } from "@/lib/util/string";
import IconButton from "@/components/IconButton";
import { TransactionStatusMessages } from "@/lib/constants";

interface TransactionProps {
  transaction: Transaction;
}

type RootStackParamList = {
  ProfileTransactionDetails: { transactionID: string } | undefined;
};

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate("ProfileTransactionDetails", { transactionID: transaction.id });
  };

  const { chipMessage, chipType } =
    TransactionStatusMessages[transaction.status as keyof typeof TransactionStatusMessages];

  return (
    <View style={tw`mt-4`}>
      <TouchableOpacity style={tw`justify-between flex-row items-center`} onPress={onPress}>
        <View style={tw`flex-row items-center`}>
          <IconButton pressable={false} filled size={32} icon="qr-code-outline" />
          <View style={tw`ml-4`}>
            <Text style={tw`text-base font-semibold`}>Order #</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-400`}>{trimToLength(transaction.id, 10)}</Text>
              <Ionicons name="chevron-forward" style={tw`text-gray-400 ml-1`} size={14} />
            </View>
          </View>
        </View>

        <Chip type={chipType as any} label={chipMessage} />
      </TouchableOpacity>
    </View>
  );
};

export default Transaction;
