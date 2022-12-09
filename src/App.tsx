import { registerRootComponent } from "expo";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import RootStackNavigator from "./navigation";
import AuthProvider from "./contexts/Auth";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer theme={theme}>
        <RootStackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

registerRootComponent(App);

export default App;
