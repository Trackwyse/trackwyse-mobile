/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import {
  useFonts,
  Syne_400Regular,
  Syne_500Medium,
  Syne_600SemiBold,
  Syne_700Bold,
  Syne_800ExtraBold,
} from "@expo-google-fonts/syne";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/screens/App/Home";
import Login from "@/screens/Auth/Login";
import Landing from "@/screens/Auth/Landing";

import RegisterStep1 from "@/screens/Auth/Register.Step1";
import RegisterStep2 from "@/screens/Auth/Register.Step2";

import MapView from "@/screens/App/MapView";
import AddLabel from "@/screens/App/AddLabel";
import EditLabel from "@/screens/App/ModifyLabel";

import FoundLabelScan from "@/screens/App/FoundLabel.Scan";
import FoundLabelDetails from "@/screens/App/FoundLabel.Details";
import FoundLabelExactLocation from "@/screens/App/FoundLabel.ExactLocation";
import FoundLabelRecoveryLocation from "@/screens/App/FoundLabel.RecoveryLocation";

import ProfileRate from "@/screens/Profile/Profile.Rate";
import ProfileHelp from "@/screens/Profile/Profile.Help";
import ProfileAbout from "@/screens/Profile/Profile.About";
import ProfileLanding from "@/screens/Profile/Profile.Landing";
import ProfilePremium from "@/screens/Profile/Profile.Premium";
import ProfileAddress from "@/screens/Profile/Profile.Address";
import ProfilePassword from "@/screens/Profile/Profile.Password";
import ProfileUserInfo from "@/screens/Profile/Profile.UserInfo";
import ProfilePurchase from "@/screens/Profile/Profile.Purchase";
import ProfileDeveloper from "@/screens/Profile/Profile.Developer";
import ProfilePremiumClaim from "@/screens/Profile/Profile.PremiumClaim";
import ProfileNotifications from "@/screens/Profile/Profile.Notifications";
import ProfilePremiumSettings from "@/screens/Profile/Profile.PremiumSettings";

import ForgotPasswordLanding from "@/screens/Auth/ForgotPassword.Landing";
import ForgotPasswordAction from "@/screens/Auth/ForgotPassword.Action";
import ForgotPasswordReset from "@/screens/Auth/ForgotPassword.Reset";

import AcceptTermsAction from "@/screens/Terms/AcceptTerms.Action";
import AcceptTermsLanding from "@/screens/Terms/AcceptTerms.Landing";

import VerificationAction from "@/screens/Verification/Verification.Action";
import VerificationLanding from "@/screens/Verification/Verification.Landing";

import { useAuth } from "@/contexts/Auth";
import IconButton from "@/components/IconButton";
import useVersioning from "@/hooks/useVersioning";
import { LabelsProvider } from "@/contexts/Labels";
import NotificationsProvider from "@/contexts/Notifications";
import NavigationWithBack from "@/components/Navigation/NavigationBackArrow";

const Stack = createNativeStackNavigator();

/*
  Stack navigator for the authentication screens.
  This is a separate stack navigator because the user
  must be authenticated before they can use the app.
*/
const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        title: "",
        gestureEnabled: false,
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
      <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPasswordLanding" component={ForgotPasswordLanding} />
      <Stack.Screen name="ForgotPasswordAction" component={ForgotPasswordAction} />
      <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordReset} />
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the verification screens.
  This is a separate stack navigator because the user
  must verify their email before they can use the app.
*/
const VerificationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        gestureEnabled: false,
        headerLeft: () => <></>,
      }}
    >
      <Stack.Screen name="VerificationLanding" component={VerificationLanding} />
      <Stack.Screen name="VerificationAction" component={VerificationAction} />
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the terms and conditions screens.
  This is a separate stack navigator because the user
  must accept the terms and conditions before they can
  use the app.
*/
const AcceptTermsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        gestureEnabled: false,
        headerLeft: () => <></>,
      }}
    >
      <Stack.Screen name="AcceptTermsLanding" component={AcceptTermsLanding} />
      <Stack.Screen name="AcceptTermsAction" component={AcceptTermsAction} />
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the app screens.
  This is a separate stack navigator because the user
  must be authenticated and verified before they can use
  the app.
*/
const AppStackNavigator: React.FC = () => {
  return (
    <LabelsProvider>
      <NotificationsProvider>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "",
              headerShadowVisible: false,
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen name="MapView" component={MapView} options={{ headerShown: false }} />
          <Stack.Screen name="AddLabel" component={AddLabel} options={{ title: "Add Label" }} />
          <Stack.Screen
            name="FoundLabelScan"
            component={FoundLabelScan}
            options={{ title: "Found Label" }}
          />
          <Stack.Screen
            name="FoundLabelDetails"
            component={FoundLabelDetails}
            options={({ navigation }) => ({
              title: "Found Label",
              gestureEnabled: false,
              headerLeft: () => <NavigationWithBack navigation={navigation} returnHome />,
            })}
          />
          <Stack.Screen
            name="FoundLabelExactLocation"
            component={FoundLabelExactLocation}
            options={{
              title: "Exact Location",
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="FoundLabelRecoveryLocation"
            component={FoundLabelRecoveryLocation}
            options={{
              title: "Recovery Location",
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="EditLabel"
            component={EditLabel}
            options={({ navigation }) => ({
              title: "Edit Label",
              gestureEnabled: false,
              headerLeft: () => <NavigationWithBack navigation={navigation} returnHome />,
              headerRight: () => <IconButton icon="trash-outline" color="firebrick" />,
            })}
          />

          <Stack.Screen
            name="ProfileLanding"
            component={ProfileLanding}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="ProfileUserInfo"
            component={ProfileUserInfo}
            options={{ title: "User Info" }}
          />
          <Stack.Screen
            name="ProfileNotifications"
            component={ProfileNotifications}
            options={{ title: "Notifications" }}
          />

          <Stack.Screen
            name="ProfilePremium"
            component={ProfilePremium}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePremiumSettings"
            component={ProfilePremiumSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePremiumClaim"
            component={ProfilePremiumClaim}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePurchase"
            component={ProfilePurchase}
            options={{ title: "Purchase" }}
          />

          <Stack.Screen name="ProfileAbout" component={ProfileAbout} options={{ title: "About" }} />
          <Stack.Screen name="ProfileRate" component={ProfileRate} options={{ title: "Rate" }} />
          <Stack.Screen name="ProfileHelp" component={ProfileHelp} options={{ title: "Help" }} />
          <Stack.Screen
            name="ProfilePassword"
            component={ProfilePassword}
            options={{ title: "Password" }}
          />
          <Stack.Screen
            name="ProfileAddress"
            component={ProfileAddress}
            options={{ title: "Address" }}
          />
          {__DEV__ && (
            <Stack.Screen
              name="ProfileDeveloper"
              component={ProfileDeveloper}
              options={{ title: "Developer" }}
            />
          )}
        </Stack.Navigator>
      </NotificationsProvider>
    </LabelsProvider>
  );
};

/*
  Root stack navigator.
  This is the main stack navigator that determines which
  stack navigator to use based on the user's authentication
  and verification status.
*/
const RootStackNavigator: React.FC = () => {
  const { loading, user } = useAuth();
  const { isLoading, isValidVersion, forceUpdateAlert } = useVersioning();
  const [fontsLoaded] = useFonts({
    Syne_400Regular,
    Syne_500Medium,
    Syne_600SemiBold,
    Syne_700Bold,
    Syne_800ExtraBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  // show the splash screen while useAuth is loading
  useEffect(() => {
    if (!isValidVersion && !isLoading) {
      forceUpdateAlert();
    }

    if (!loading && !isLoading && isValidVersion && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loading, isLoading, isValidVersion, fontsLoaded]);

  if (loading || isLoading || !fontsLoaded) {
    return null;
  }

  if (!user || Object.keys(user).length === 0) {
    return <AuthStackNavigator />;
  }

  if (!user?.verified) {
    return <VerificationStackNavigator />;
  }

  if (!user?.termsAccepted) {
    return <AcceptTermsStackNavigator />;
  }

  return <AppStackNavigator />;
};

export default RootStackNavigator;
