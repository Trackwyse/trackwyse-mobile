import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
