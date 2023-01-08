import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import { Text, TextInput } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthProvider from "@/contexts/Auth";
import queryClient from "@/lib/queryClient";
import RootStackNavigator from "@/navigation";
import { InAppPurchasesProvider } from "@/contexts/InAppPurchases";
import { DynamicLabelsProvider } from "@/contexts/DynamicLabels";

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
        <DynamicLabelsProvider>
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
        </DynamicLabelsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
