import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Multiselect from "@/components/Multiselect";
import { useNotifications } from "@/contexts/Notifications";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { enabled, setStatus, loading } = useNotifications();

  return (
    <Container>
      <Text variant="title">Notifications</Text>
      <Text variant="subtitle">Update your notification preferences. You're in control.</Text>

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
