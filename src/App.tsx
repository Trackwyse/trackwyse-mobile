import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import { Text, TextInput } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { startNetworkLogging } from "react-native-network-logger";

import AuthProvider from "./contexts/Auth";
import queryClient from "./lib/queryClient";
import RootStackNavigator from "./navigation";
import { InAppPurchasesProvider } from "./contexts/InAppPurchases";

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

SplashScreen.preventAutoHideAsync();

if (__DEV__) startNetworkLogging();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InAppPurchasesProvider>
          <NavigationContainer theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <RootStackNavigator />
                <Toast />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </InAppPurchasesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
