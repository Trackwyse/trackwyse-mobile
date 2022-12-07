import tw from "twrnc";
import { registerRootComponent } from "expo";
import { SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootStackNavigator from "./navigation";

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

registerRootComponent(App);

export default App;
