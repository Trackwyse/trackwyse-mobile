import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "@/lib/tailwind";
import Chip from "../Chip";

interface LabelProps {
  label: Label;
}

type RootStackParamList = {
  EditLabel: { labelId: string } | undefined;
};

const Label: React.FC<LabelProps> = ({ label }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`max-w-1/2 flex-1 p-1`}>
      <TouchableOpacity
        style={tw.style(`pt-12 border  border-gray-100 rounded-lg items-center pb-5`)}
        onPress={() => navigation.navigate("EditLabel", { labelId: label._id })}
      >
        <View style={tw.style(`rounded-full p-8`, label.color?.bg)}>
          <View style={tw`absolute inset-0  items-center justify-center`}>
            <Ionicons name="ios-locate-outline" size={32} color="white" />
          </View>
        </View>
        <Text style={tw`font-medium text-lg mt-3`}>{label.name ? label.name : "No Name"}</Text>
        <Text style={tw`text-gray-400 text-sm text-center`}>Click to view more information</Text>
        <Chip
          type="error"
          label="Item Missing"
          style={tw`mt-1 ${label.isLost ? "opacity-100" : "opacity-0"}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Label;
