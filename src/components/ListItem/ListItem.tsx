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
  iconRightColor?: string;
  iconLeftColor?: string;
  pressable?: boolean;
  disabled?: boolean;
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
  iconRightColor = tw.color("gray-400"),
  iconLeftColor = tw.color("black"),
  pressable = false,
  disabled = false,
  onPress,
  style,
}) => {
  const containerClasses = tw.style(
    "p-4 bg-gray-100",
    textBottom ? "flex-col" : "flex-row justify-between items-center",
    disabled ? "opacity-50" : "",
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
      <View style={tw`flex-row justify-between w-full`}>
        <View style={tw`flex-row items-center`}>
          {iconLeft && (
            <Ionicons name={iconLeft} size={22} style={tw.style("mr-4")} color={iconLeftColor} />
          )}
          <Text style={tw.style(`font-medium text-base text-black`)}>{title}</Text>
        </View>
        {iconRight && <Ionicons name={iconRight} size={20} color={iconRightColor} />}
        {textRight && <Text style={tw` text-gray-400 text-base`}>{textRight}</Text>}
      </View>
      {textBottom && <Text style={tw`text-gray-400 text-base pt-2`}>{textBottom}</Text>}
    </TouchableOpacity>
  );
};

export default ListItem;
