import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

interface HeaderProps {
  title: string;
  subtitle: string;
  navigation: NativeStackNavigationProp<any>;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, navigation }) => {
  return <View></View>;
};

export default Header;
