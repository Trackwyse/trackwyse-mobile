import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

interface NavigationBackArrowProps {
  navigation: NativeStackNavigationProp<any>;
}

const NavigationWithBack: React.FC<NavigationBackArrowProps> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={25} />
    </TouchableOpacity>
  );
};

export default NavigationWithBack;
