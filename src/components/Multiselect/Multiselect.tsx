import tw from "@/lib/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface MultiselectProps {
  title: string;
  description: string;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  onPress?: () => void;
}

const Multiselect: React.FC<MultiselectProps> = ({
  title,
  description,
  selected,
  loading,
  disabled,
  style,
  onPress,
}) => {
  const containerClasses = tw.style(
    "rounded-md w-11/12",
    selected ? "border-black border-2" : "border border-gray-100",
    style
  );

  return (
    <View style={containerClasses}>
      <TouchableOpacity style={tw`p-5`} disabled={disabled || loading} onPress={onPress}>
        <View style={tw`mb-2 flex-row justify-between items-center`}>
          <Text style={tw`font-medium text-xl`}>{title}</Text>
          {selected && <Ionicons name="checkmark-circle" size={22} />}
        </View>
        <Text style={tw`text-gray-400 text-base`}>{description}</Text>
      </TouchableOpacity>
      {loading && (
        <BlurView
          intensity={5}
          style={tw`absolute w-full h-full rounded-md  items-center justify-center`}
        >
          <ActivityIndicator size="large" color="black" />
        </BlurView>
      )}
    </View>
  );
};

export default Multiselect;
