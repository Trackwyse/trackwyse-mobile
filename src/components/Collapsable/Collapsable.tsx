import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "@/lib/tailwind";
import { useState } from "react";

interface CollapsableProps {
  title: string;
  content: string;
  style?: any;
}

const Collapsable: React.FC<CollapsableProps> = ({ title, content, style }) => {
  const [expanded, setExpanded] = useState(false);

  const containerClasses = tw.style("w-11/12 bg-gray-100 p-5 rounded-2xl", style);

  const onPress = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity style={containerClasses} onPress={onPress}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-semibold`}>{title}</Text>
        <Ionicons
          name={expanded ? "md-chevron-up" : "md-chevron-down"}
          style={tw`text-gray-300`}
          size={20}
        />
      </View>
      <View style={tw.style(expanded ? "" : "hidden")}>
        <Text style={tw`text-gray-400 text-base mt-3`}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Collapsable;