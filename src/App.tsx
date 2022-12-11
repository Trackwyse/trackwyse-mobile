import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import queryClient from "./lib/queryClient";
import AuthProvider from "./contexts/Auth";
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer theme={theme}>
          <RootStackNavigator />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
