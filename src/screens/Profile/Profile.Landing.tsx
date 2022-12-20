import { ScrollView } from "react-native";

import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center`}>
      <ListItem
        pressable
        title="User Info"
        iconLeft="person-outline"
        position="alone"
        iconRight="md-chevron-forward-outline"
        style={tw`mt-5`}
      />

      <ListItem
        pressable
        title="Purchase Trackers"
        iconLeft="cart-outline"
        position="top"
        style={tw`mt-5`}
        iconRight="md-chevron-forward-outline"
      />
      <ListItem
        pressable
        title="Rate Trackerwind"
        iconLeft="star-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
      />
      <ListItem
        pressable
        title="Share Trackerwind"
        iconLeft="share-social-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
      />
      <ListItem
        pressable
        title="Help"
        iconLeft="help-circle-outline"
        position="middle"
        iconRight="md-chevron-forward-outline"
      />
      <ListItem
        pressable
        title="About"
        iconLeft="information-circle-outline"
        position="bottom"
        iconRight="md-chevron-forward-outline"
      />

      <ListItem
        pressable
        title="Logout"
        style={tw`justify-center mt-5`}
        textColor="red"
        position="alone"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

export default Profile;
