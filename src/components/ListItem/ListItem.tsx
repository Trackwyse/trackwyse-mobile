import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";
import tw from "../../lib/tailwind";

const borderClasses = {
  top: "rounded-t-md border-b border-zinc-200",
  middle: "border-b border-zinc-200",
  bottom: "rounded-b-md",
};

interface ListItemProps {
  title: string;
  position?: "top" | "middle" | "bottom";
  iconRight?: keyof typeof Ionicons.glyphMap;
  textRight?: string;
  style?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  position = "top",
  iconRight,
  textRight,
  style,
}) => {
  const containerClasses = tw.style(
    "p-4 bg-gray-100 w-11/12 flex-row items-center justify-between",
    borderClasses[position],
    style
  );

  return (
    <View style={containerClasses}>
      <Text style={tw`font-medium text-base`}>{title}</Text>
      {iconRight && (
        <Ionicons name={iconRight} size={24} style={tw`text-gray-300`} />
      )}
      {textRight && (
        <Text style={tw` text-gray-300 text-base`}>{textRight}</Text>
      )}
    </View>
  );
};

export default ListItem;
