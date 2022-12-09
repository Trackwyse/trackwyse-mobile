import { registerRootComponent } from "expo";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import RootStackNavigator from "./navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

registerRootComponent(App);

export default App;
