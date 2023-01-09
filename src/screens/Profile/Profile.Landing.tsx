import { ScrollView, Share, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Constants from "@/lib/constants";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { stringifyVersion } from "@/lib/textUtil";
import { useInAppPurchases } from "@/contexts/InAppPurchases";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { signOut, user } = useAuth();
  const { restorePurchases } = useInAppPurchases();

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
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-20`}>
        <Text style={tw`mb-3 mt-6 text-base text-gray-400 uppercase`}>User Settings</Text>
        <ListItem
          pressable
          title="User Info"
          iconLeft="person-outline"
          position="top"
          iconRight="md-chevron-forward-outline"
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

        <Text style={tw`mb-3 mt-6 text-base text-gray-400 uppercase`}>Subscription</Text>
        <ListItem
          pressable
          title="Trackwyse Plus"
          iconLeft="gift-outline"
          iconLeftColor="gold"
          position="top"
          iconRight="md-chevron-forward-outline"
          onPress={() => handleItemPress("ProfilePremium")}
        />
        <ListItem
          pressable={user?.subscriptionActive}
          disabled={!user?.subscriptionActive}
          title="Subscription Settings"
          iconLeft="gift-outline"
          iconLeftColor="gold"
          position="middle"
          iconRight="md-chevron-forward-outline"
          onPress={() => handleItemPress("ProfilePremiumSettings")}
        />
        <ListItem
          pressable
          title="Restore Purchases"
          iconLeft="gift-outline"
          iconLeftColor="gold"
          position="bottom"
          onPress={restorePurchases}
        />

        <Text style={tw`mb-3 mt-6 text-base text-gray-400 uppercase`}>Support</Text>
        <ListItem
          pressable
          title="Purchase Trackers"
          iconLeft="cart-outline"
          position="top"
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

        {__DEV__ && (
          <View>
            <Text style={tw`mb-3 mt-6 text-base text-gray-400 uppercase`}>Developer</Text>
            <ListItem
              pressable
              title="Network Logs"
              iconLeft="code-outline"
              position="alone"
              iconRight="md-chevron-forward-outline"
              onPress={() => handleItemPress("ProfileDeveloper")}
            />
          </View>
        )}

        <Button size="lg" color="primary" style={tw`mt-5`} onPress={handleLogout}>
          Logout
        </Button>

        <Text style={tw`text-gray-400 text-xs mt-3 text-center`}>
          App version: {Constants.version} (v{stringifyVersion(Constants.versionInt)}),
          {__DEV__ ? "development" : "production"} build
        </Text>
      </ScrollView>
    </Container>
  );
};

export default Profile;
