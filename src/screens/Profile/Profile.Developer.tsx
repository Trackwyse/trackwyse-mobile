import tw from "@/lib/tailwind";
import { View } from "react-native";
import NetworkLogger from "react-native-network-logger";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  return (
    <View style={tw`w-full h-full`}>
      <NetworkLogger />
    </View>
  );
};

export default Profile;
