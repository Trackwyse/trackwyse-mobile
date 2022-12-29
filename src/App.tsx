import { registerRootComponent } from "expo";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AuthProvider from "./contexts/Auth";
import queryClient from "./lib/queryClient";
import RootStackNavigator from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, TextInput, View } from "react-native";

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

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
