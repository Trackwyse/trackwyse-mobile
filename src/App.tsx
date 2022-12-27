import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import tw from "@/lib/tailwind";
import AuthProvider from "./contexts/Auth";
import queryClient from "./lib/queryClient";
import RootStackNavigator from "./navigation";
import NotificationsProvider from "./contexts/Notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const App = () => {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <AuthProvider>
            <NavigationContainer theme={theme}>
              <RootStackNavigator />
              <Toast />
            </NavigationContainer>
          </AuthProvider>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

registerRootComponent(App);

export default App;
