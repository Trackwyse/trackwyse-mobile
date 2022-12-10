import { registerRootComponent } from "expo";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import queryClient from "./lib/queryClient";
import AuthProvider from "./contexts/Auth";
import RootStackNavigator from "./navigation";
import { QueryClientProvider } from "@tanstack/react-query";

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
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
