import { View } from "react-native";
import Input from "../components/Input";
import tw from "../lib/tailwind";

const Landing: React.FC = () => {
  return (
    <View style={tw`flex justify-center items-center pt-20`}>
      <Input size="lg" placeholder="Test" />
    </View>
  );
};

export default Landing;
