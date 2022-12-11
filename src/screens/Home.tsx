import { Text, View } from "react-native";
import Button from "../components/Button";
import { useAuth } from "../contexts/Auth";

const Home: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <View>
      <Text>
        Welcome {user.firstName} {user.lastName}{" "}
      </Text>
      <Button size="lg" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
};

export default Home;
