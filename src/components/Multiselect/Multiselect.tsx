import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import LoadingRect from "@/components/LoadingRect";

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
    "rounded-md w-full",
    selected ? "border-black border-2" : "border border-gray-100",
    style
  );

  return (
    <View style={containerClasses}>
      <TouchableOpacity
        style={tw.style(`p-5`, loading && "opacity-0")}
        disabled={disabled || loading}
        onPress={onPress}
      >
        <View style={tw`mb-2 flex-row justify-between items-center`}>
          <Text style={tw`font-medium text-xl`}>{title}</Text>
          {selected && <Ionicons name="checkmark-circle" size={22} />}
        </View>
        <Text variant="subtitle" disableDefaultPadding>
          {description}
        </Text>
      </TouchableOpacity>
      {loading && (
        <View style={tw`absolute w-full h-full rounded-md p-5`}>
          <LoadingRect width={150} height={20} />
          <LoadingRect height={40} />
        </View>
      )}
    </View>
  );
};

export default Multiselect;
