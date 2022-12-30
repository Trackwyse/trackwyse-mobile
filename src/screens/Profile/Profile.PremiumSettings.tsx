import { PremiumHeader } from "@/components/Header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle="Manage Your Subscription"
        navigation={navigation}
      />
    </View>
  );
};

export default Profile;
