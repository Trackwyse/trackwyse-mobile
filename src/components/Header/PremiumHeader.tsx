import tw from "@/lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, Text } from "react-native";
import IconButton from "../IconButton";

interface PremiumHeaderProps {
  title: string;
  subtitle: string;
  navigation: NativeStackNavigationProp<any>;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ title, subtitle, navigation }) => {
  return (
    <LinearGradient
      style={tw`items-center pb-8 w-full`}
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.1694, 0.6354, 0.93354]}
      colors={[tw.color("aqua-300") as string, "#D7ECE8", tw.color("aqua-300") as string]}
    >
      <SafeAreaView style={tw`w-5/6`}>
        <IconButton
          filled
          color="white"
          icon="arrow-back"
          style={tw`my-4`}
          size={22}
          fillColor={tw.color("primary-200")}
          onPress={() => navigation.goBack()}
        />
        <Text style={tw.style(`text-3xl pb-4`, { fontFamily: "Syne_700Bold" })}>{title}</Text>
        <Text style={tw.style(`text-lg`, { fontFamily: "Syne_400Regular" })}>{subtitle}</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PremiumHeader;
