import { View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import IconButton from "@/components/IconButton";

interface InfoCardProps {
  title: string;
  subtitle: string;
  pressable?: boolean;
  onPress?: () => void;
  iconLeft: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  iconRightColor?: string;
  componentRight?: React.ReactNode;
  style?: any;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  iconLeft,
  iconRight,
  componentRight,
  style,
  onPress,
  pressable = false,
  iconRightColor = tw.color("gray-400"),
}) => {
  const containerStyle = tw.style(`flex-row justify-between`, style);

  return (
    <TouchableOpacity onPress={onPress} disabled={!pressable} style={containerStyle}>
      <View style={tw`flex-row w-full shrink items-center`}>
        <IconButton icon={iconLeft} filled pressable={false} size={30} />
        <View style={tw`ml-5 shrink`}>
          <Text style={tw`text-lg font-medium`}>{title}</Text>
          <Text variant="premium_subtitle" disableDefaultPadding>
            {subtitle}
          </Text>
        </View>
      </View>
      <View style={tw`justify-center`}>
        {iconRight && <Ionicons name={iconRight} size={20} color={iconRightColor} />}
        {componentRight}
      </View>
    </TouchableOpacity>
  );
};

export default InfoCard;
