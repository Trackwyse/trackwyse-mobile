/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Chip from "@/components/Chip";
import { trimToLength } from "@/lib/util/string";
import IconButton from "../IconButton";

interface LabelProps {
  label: Label;
}

type RootStackParamList = {
  EditLabel: { labelId: string } | undefined;
};

const Label: React.FC<LabelProps> = ({ label }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`mt-4`}>
      <TouchableOpacity
        style={tw`justify-between flex-row items-center`}
        onPress={() => navigation.navigate("EditLabel", { labelId: label.uniqueID })}
      >
        <View style={tw`flex-row items-center`}>
          <IconButton pressable={false} filled size={32} icon="locate-outline" />
          <View style={tw`ml-4`}>
            <Text style={tw`text-base font-semibold`}>
              {label.name ? trimToLength(label.name, 12) : "No Name"}
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-400 `}>View Details</Text>
              <Ionicons name="chevron-forward" style={tw`text-gray-400 ml-1`} size={14} />
            </View>
          </View>
        </View>

        <Chip label="Missing" style={tw.style(label.isLost ? `bg-primary-200` : "opacity-0")} />
      </TouchableOpacity>
    </View>
  );
};

export default Label;
