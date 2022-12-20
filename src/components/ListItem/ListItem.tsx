import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "@/lib/tailwind";

const borderClasses = {
  top: "rounded-t-md border-b border-zinc-200",
  middle: "border-b border-zinc-200",
  bottom: "rounded-b-md",
  alone: "rounded-md",
};

interface ListItemProps {
  title: string;
  position?: "top" | "middle" | "bottom" | "alone";
  iconLeft?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  textRight?: string;
  textBottom?: string;
  textColor?: string;
  pressable?: boolean;
  onPress?: () => void;
  style?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  position = "top",
  iconLeft,
  iconRight,
  textRight,
  textBottom,
  textColor,
  pressable = false,
  onPress,
  style,
}) => {
  const containerClasses = tw.style(
    "p-4 bg-gray-100 w-11/12",
    textBottom ? "flex-col" : "flex-row justify-between items-center",
    borderClasses[position],
    style
  );

  return (
    <TouchableOpacity
      disabled={!pressable}
      style={containerClasses}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={tw`flex-row items-center`}>
        {iconLeft && (
          <Ionicons
            name={iconLeft}
            size={22}
            style={tw.style("mr-4", { color: textColor ? textColor : "#000" })}
          />
        )}
        <Text style={tw.style(`font-medium text-base`, { color: textColor ? textColor : "#000" })}>
          {title}
        </Text>
      </View>
      {iconRight && <Ionicons name={iconRight} size={24} style={tw`text-gray-300`} />}
      {textRight && <Text style={tw` text-gray-300 text-base`}>{textRight}</Text>}
      {textBottom && <Text style={tw`text-gray-300 text-base pt-2`}>{textBottom}</Text>}
    </TouchableOpacity>
  );
};

export default ListItem;
