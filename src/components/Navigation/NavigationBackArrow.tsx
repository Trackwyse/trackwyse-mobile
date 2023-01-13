/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

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
      return navigation.navigate("Home");
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
