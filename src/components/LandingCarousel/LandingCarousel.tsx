import tw from "@/lib/tailwind";
import Assets from "@/assets";
import { View, Text, SafeAreaView, Image } from "react-native";
import Swiper from "react-native-swiper";
import Container from "../Container";

const LandingCarousel: React.FC = () => {
  return (
    <Swiper loop={false} activeDotColor={tw.color("primary-200")}>
      <LandingItem style={tw`justify-between bg-aqua-100`}>
        <Container>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`max-w-4/5 text-4xl font-medium my-2`}>Get notified when found.</Text>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Save your day.</Text>
        </Container>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-lime-100`}>
        <View style={tw`mb-10`}>
          <Image
            source={Assets.labelYellow}
            style={{ width: 212, height: 212, resizeMode: "contain" }}
          />
        </View>
        <Container style={tw`items-center`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Track items.</Text>
          <Text style={tw`text-lg font-medium my-2 text-center`}>
            Track your items using QR code labels and easily scan them to add them to your account.
          </Text>
        </Container>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-yellow-100`}>
        <View style={tw`mb-10`}>
          <Image
            source={Assets.labelOrange}
            style={{ width: 212, height: 212, resizeMode: "contain" }}
          />
        </View>
        <Container style={tw`items-center`}>
          <Text style={tw`max-w-2/3 text-4xl font-medium my-2`}>Find lost items.</Text>
          <Text style={tw`text-lg font-medium my-2 text-center`}>
            Get notified when your belongings are found by another user, and view the finder's
            contact information.
          </Text>
        </Container>
      </LandingItem>
      <LandingItem style={tw`justify-between bg-indigo-100`}>
        <View style={tw`mb-10`}>
          <Image
            source={Assets.labelPink}
            style={{ width: 212, height: 212, resizeMode: "contain" }}
          />
        </View>
        <Container style={tw`items-center`}>
          <Text style={tw` text-4xl font-medium my-2`}>Stay Organized.</Text>
          <Text style={tw`text-lg font-medium my-2 text-center`}>
            Add contact information and custom messages to each item's label for even better
            organization.
          </Text>
        </Container>
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
