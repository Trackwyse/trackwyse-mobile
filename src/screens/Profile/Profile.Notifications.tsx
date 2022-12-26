import Multiselect from "@/components/Multiselect";
import { useNotifications } from "@/contexts/Notifications";
import tw from "@/lib/tailwind";
import { View, Text } from "react-native";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { enabled, setStatus, loading } = useNotifications();

  return (
    <View style={tw`items-center`}>
      <View style={tw`w-11/12 pt-10 pb-5`}>
        <Text style={tw`text-2xl font-bold`}>Notifications</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your notification preferences. You're in control.
        </Text>
      </View>

      <Multiselect
        title="Notifications Enabled"
        description="You will receive a push notification if your tracked items are located."
        style={tw`my-1`}
        selected={enabled}
        loading={loading}
        onPress={() => setStatus(true)}
      />
      <Multiselect
        title="Notifications Disabled"
        description="You will not receive a push notification if your tracked items are located."
        style={tw`my-1`}
        selected={!enabled}
        loading={loading}
        onPress={() => setStatus(false)}
      />
    </View>
  );
};

export default Profile;
