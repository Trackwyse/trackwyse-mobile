import tw from "@/lib/tailwind";
import { View, Text } from "react-native";

interface ProfileScreenProps {}

//
const Profile: React.FC<ProfileScreenProps> = ({}) => {
  return (
    <View style={tw`items-center`}>
      <View style={tw`w-11/12 h-full pt-10`}>
        <Text style={tw`text-2xl font-bold`}>Notifications</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Choose which notifications you want to receive.
        </Text>
      </View>
    </View>
  );
};

export default Profile;
