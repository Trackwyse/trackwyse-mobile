import tw from "@/lib/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface BannerProps {
  title: string;
  subtitle: string;
  image: any;
  gradient?: [string, string];
  gradientBorder?: [string, string];
  onPress?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  image,
  gradient = [tw.color("aqua-100") as string, tw.color("aqua-200") as string],
  gradientBorder = [tw.color("aqua-100") as string, tw.color("aqua-200") as string],
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={tw`p-1 mt-5 mb-7 rounded-[28px]`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.2, y: 1.2 }}
        colors={gradientBorder}
      >
        <View style={tw`items-center`}>
          <LinearGradient
            start={[0, 0]}
            end={[1, 1]}
            locations={[0.1694, 0.5354, 0.93354]}
            colors={[gradient[0], "#FFF7CF", gradient[1]]}
            style={tw`flex-row justify-between rounded-3xl w-full p-7`}
          >
            <View style={tw`max-w-1/2`}>
              <Text style={tw`text-xl font-medium`}>{title}</Text>
              <View style={tw`flex-row mt-8 items-center`}>
                <Text style={tw`text-primary-100 text-base`}>{subtitle}</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={17}
                  color={tw.color("primary-100") as string}
                  style={tw`ml-2`}
                />
              </View>
            </View>
            <View>
              <Image
                source={image}
                style={{ flex: 1, width: 110, height: 110, resizeMode: "contain" }}
              />
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Banner;
