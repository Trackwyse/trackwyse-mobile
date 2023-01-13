import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Multiselect from "@/components/Multiselect";
import { useNotifications } from "@/contexts/Notifications";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { notificationsEnabled, setNotificationsEnabled, loading } = useNotifications();

  return (
    <Container>
      <Text variant="title">Notifications</Text>
      <Text variant="subtitle">Update your notification preferences. You're in control.</Text>

      <Multiselect
        title="Notifications Enabled"
        description="You will receive a push notification if your tracked items are located."
        style={tw`my-1`}
        selected={notificationsEnabled}
        loading={loading}
        onPress={() => setNotificationsEnabled(true)}
      />
      <Multiselect
        title="Notifications Disabled"
        description="You will not receive a push notification if your tracked items are located."
        style={tw`my-1`}
        selected={!notificationsEnabled}
        loading={loading}
        onPress={() => setNotificationsEnabled(false)}
      />
    </Container>
  );
};

export default Profile;
