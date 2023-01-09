import { Text } from "react-native";

import tw from "@/lib/tailwind";
import Container from "@/components/Container";
import Multiselect from "@/components/Multiselect";
import { useNotifications } from "@/contexts/Notifications";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { enabled, setStatus, loading } = useNotifications();

  return (
    <Container>
      <Text style={tw`text-2xl font-bold pt-10`}>Notifications</Text>
      <Text style={tw`my-4 text-gray-400 text-base`}>
        Update your notification preferences. You're in control.
      </Text>

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
    </Container>
  );
};

export default Profile;
