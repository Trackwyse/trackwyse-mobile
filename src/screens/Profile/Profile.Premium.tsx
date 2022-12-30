import Button from "@/components/Button";
import { PremiumHeader } from "@/components/Header";
import Hyperlink from "@/components/Hyperlink";
import IconButton from "@/components/IconButton";
import tw from "@/lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View, Text } from "react-native";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View style={tw`items-center`}>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle="Unlock additional perks"
        navigation={navigation}
      />

      <ScrollView style={tw`w-11/12 `} contentContainerStyle={tw`pb-5`}>
        <Text style={tw`mt-10 font-medium text-2xl`}>Whats Included:</Text>

        <View style={tw`flex-row mt-5`}>
          <IconButton icon="cash-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Free Tracking Labels</Text>
            <Text style={tw`text-gray-400 text-base`}>
              Request additional tracking labels every month at no extra cost.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="map-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Advanced Mapping</Text>
            <Text style={tw`text-gray-400 text-base`}>
              View item recovery information such as distance, fastest routes, and more.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="refresh-circle-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Recovery History</Text>
            <Text style={tw`text-gray-400 text-base`}>
              View the recovery history of your labels and previous finders contact information.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="shield-checkmark-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Secure Recoveries</Text>
            <Text style={tw`text-gray-400 text-base`}>
              Get added protection against fraud, with additional recovery location verification.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={tw.style(`bg-white flex-grow w-full items-center h-1/3 pt-6 rounded-3xl`, {
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        })}
      >
        <Button size="lg">Subscribe for $7.99/mo</Button>
        <Hyperlink style={tw`w-11/12 mt-3`} textStyle={tw`no-underline text-center text-gray-400`}>
          By subscribing to Trackwyse Plus, you have read and agree to our Terms and Conditions
        </Hyperlink>
      </View>
    </View>
  );
};

export default Profile;
