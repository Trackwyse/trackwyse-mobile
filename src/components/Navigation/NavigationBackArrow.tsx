import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

interface NavigationBackArrowProps {
  navigation: NativeStackNavigationProp<any>;
  returnHome?: boolean;
}

const NavigationWithBack: React.FC<NavigationBackArrowProps> = ({
  navigation,
  returnHome = false,
}) => {
  const onPress = () => {
    if (returnHome) {
      return navigation.navigate("home");
    }

    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="arrow-back" size={25} />
    </TouchableOpacity>
  );
};

export default NavigationWithBack;
