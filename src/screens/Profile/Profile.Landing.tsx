import { ScrollView, Share, Text } from "react-native";

import tw from "@/lib/tailwind";
import Constants from "@/lib/constants";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import { stringifyVersion } from "@/lib/textUtil";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  const handleItemPress = (location: string) => {
    navigation.navigate(location);
  };

  const onShare = async () => {
    try {
      await Share.share({
        url: "https://trackwyse.com",
        message: "Check out Trackwyse!",
      });
    } catch {}
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center`}>
      <ListItem
        pressable
        title="User Info"
        iconLeft="person-outline"
        position="top"
        iconRight="md-chevron-forward-outline"
        style={tw`mt-5`}
        onPress={() => handleItemPress("ProfileUserInfo")}
      />
      <ListItem
        pressable
        title="Notifications"
        iconLeft="notifications-outline"
        position="bottom"
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfileNotifications")}
      />

      <ListItem
        pressable
        title="Purchase Trackers"
        iconLeft="cart-outline"
        position="top"
        style={tw`mt-5`}
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfilePurchase")}
      />
      <ListItem
        pressable
        title="Rate Trackwyse"
        iconLeft="star-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfileRate")}
      />
      <ListItem
        pressable
        title="Share Trackwyse"
        iconLeft="share-social-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
        onPress={onShare}
      />
      <ListItem
        pressable
        title="Help"
        iconLeft="help-circle-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfileHelp")}
      />
      <ListItem
        pressable
        title="About"
        iconLeft="information-circle-outline"
        position="bottom"
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfileAbout")}
      />

      <ListItem
        pressable
        title="Logout"
        style={tw`justify-center mt-5`}
        textColor="red"
        position="alone"
        onPress={handleLogout}
      />

      <Text style={tw`text-gray-400 text-xs mt-3`}>
        App version: {Constants.version} (v{stringifyVersion(Constants.versionInt)}),
        {__DEV__ ? "development" : "production"} build
      </Text>
    </ScrollView>
  );
};

export default Profile;
