/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthProvider from "@/contexts/Auth";
import useLinking from "@/hooks/useLinking";
import queryClient from "@/lib/queryClient";
import RootStackNavigator from "@/navigation";
import { InAppPurchasesProvider } from "@/contexts/InAppPurchases";
import { DynamicLabelsProvider } from "@/contexts/DynamicLabels";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

SplashScreen.preventAutoHideAsync();

if (__DEV__) startNetworkLogging();

const App = () => {
  const linking = useLinking();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DynamicLabelsProvider>
          <InAppPurchasesProvider>
            <NavigationContainer linking={linking} theme={theme}>
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
