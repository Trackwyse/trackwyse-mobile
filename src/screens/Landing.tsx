import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import tw from "../lib/tailwind";

interface LandingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Landing: React.FC<LandingScreenProps> = ({ navigation }) => {
  const tempLoginNavigate = () => {
    navigation.navigate("login");
  };

  const tempRegisterNavigate = () => {
    navigation.navigate("register");
  };

  return (
    <View style={tw`flex justify-end items-center h-full pb-10`}>
      <Button style={tw`my-2`} size="lg" onPress={tempRegisterNavigate}>
        Register
      </Button>
      <Button style={tw`my-2`} size="lg" onPress={tempLoginNavigate}>
        Login
      </Button>
    </View>
  );
};

export default Landing;
