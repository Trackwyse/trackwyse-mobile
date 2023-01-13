import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import IconButton from "@/components/IconButton";

interface InfoCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  style?: any;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle, icon, style }) => {
  const containerStyle = tw.style(`flex-row`, style);

  return (
    <View style={containerStyle}>
      <IconButton icon={icon} filled pressable={false} size={30} />
      <View style={tw`ml-5 shrink`}>
        <Text style={tw`text-lg font-medium`}>{title}</Text>
        <Text variant="premium_subtitle">{subtitle}</Text>
      </View>
    </View>
  );
};

export default InfoCard;
