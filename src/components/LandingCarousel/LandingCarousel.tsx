import tw from "@/lib/tailwind";
import { View, Text, SafeAreaView } from "react-native";
import Swiper from "react-native-swiper";

const LandingCarousel: React.FC = () => {
  return (
    <Swiper loop activeDotColor={tw.color("primary-200")} autoplay autoplayTimeout={5.0}>
      <LandingItem style={tw`justify-between bg-aqua-100`}>
        <View style={tw`w-11/12 items-start`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`max-w-4/5 text-4xl font-medium my-2`}>Get notified when found.</Text>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Save the day.</Text>
        </View>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-lime-100`}>
        <View style={tw`w-11/12 items-start`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`max-w-4/5 text-4xl font-medium my-2`}>Get notified when found.</Text>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Save the day.</Text>
        </View>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-yellow-100`}>
        <View style={tw`w-11/12 items-start`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`max-w-4/5 text-4xl font-medium my-2`}>Get notified when found.</Text>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Save the day.</Text>
        </View>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-indigo-100`}>
        <View style={tw`w-11/12 items-start`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`max-w-4/5 text-4xl font-medium my-2`}>Get notified when found.</Text>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Save the day.</Text>
        </View>
      </LandingItem>
    </Swiper>
  );
};

interface LandingItemProps {
  children: React.ReactNode;
  style?: any;
}

const LandingItem: React.FC<LandingItemProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={tw.style(`h-full`, style)}>
      <View style={tw`items-center w-full`}>
        <Text style={tw`text-xl font-medium mt-4`}>trackwyse</Text>
      </View>
      <View style={tw`items-center w-full`}>{children}</View>
      <View />
    </SafeAreaView>
  );
};

export default LandingCarousel;
