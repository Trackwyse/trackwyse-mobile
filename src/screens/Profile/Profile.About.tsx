import { ScrollView } from "react-native";

import ListItem from "@/components/ListItem";
import tw from "@/lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const handleItemPress = (location: string) => {
    navigation.navigate(location);
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center`}>
      <ListItem
        pressable
        title="Terms and Conditions"
        iconLeft="ios-newspaper-outline"
        position="alone"
        iconRight="md-chevron-forward-outline"
        style={tw`mt-5`}
        onPress={() => handleItemPress("ProfileTerms")}
      />

      <ListItem
        pressable
        title="Privacy Policy"
        iconLeft="ios-lock-closed-outline"
        position="alone"
        style={tw`mt-5`}
        iconRight="md-chevron-forward-outline"
        onPress={() => handleItemPress("ProfilePrivacy")}
      />
    </ScrollView>
  );
};

export default Profile;
