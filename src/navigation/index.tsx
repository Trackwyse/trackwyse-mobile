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

import lodash from "lodash";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import ProfileAdmin from "@/screens/Profile/Profile.Admin";
import ProfileDelete from "@/screens/Profile/Profile.Delete";
import ProfileLanding from "@/screens/Profile/Profile.Landing";
import ProfilePremium from "@/screens/Profile/Profile.Premium";
import ProfileAddress from "@/screens/Profile/Profile.Address";
import ProfilePassword from "@/screens/Profile/Profile.Password";
import ProfileUserInfo from "@/screens/Profile/Profile.UserInfo";
import ProfileDeveloper from "@/screens/Profile/Profile.Developer";
import ProfileTransactions from "@/screens/Profile/Profile.Transactions";
import ProfilePremiumClaim from "@/screens/Profile/Profile.PremiumClaim";
import ProfileNotifications from "@/screens/Profile/Profile.Notifications";
import ProfilePremiumSettings from "@/screens/Profile/Profile.PremiumSettings";
import ProfileTransactionDetails from "@/screens/Profile/Profile.TransactionDetails";

import StoreProduct from "@/screens/Store/Store.Product";
import StoreLanding from "@/screens/Store/Store.Landing";

import CheckoutLanding from "@/screens/Checkout/Checkout.Landing";
import CheckoutAddress from "@/screens/Checkout/Checkout.Address";
import CheckoutBilling from "@/screens/Checkout/Checkout.Billing";

import ForgotPasswordReset from "@/screens/Auth/ForgotPassword.Reset";
import ForgotPasswordAction from "@/screens/Auth/ForgotPassword.Action";
import ForgotPasswordLanding from "@/screens/Auth/ForgotPassword.Landing";

import AcceptTermsAction from "@/screens/Terms/AcceptTerms.Action";
import AcceptTermsLanding from "@/screens/Terms/AcceptTerms.Landing";

import VerificationAction from "@/screens/Verification/Verification.Action";
import VerificationLanding from "@/screens/Verification/Verification.Landing";

import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import IconButton from "@/components/IconButton";
import useVersioning from "@/hooks/useVersioning";
import { LabelsProvider } from "@/contexts/Labels";
import { CheckoutProvider } from "@/contexts/Checkout";
import NotificationsProvider from "@/contexts/Notifications";
import NavigationWithBack from "@/components/Navigation/NavigationBackArrow";

const Tab = createBottomTabNavigator();
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
      <Stack.Screen name="Home" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
      <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPasswordLanding" component={ForgotPasswordLanding} />
      <Stack.Screen name="ForgotPasswordAction" component={ForgotPasswordAction} />
      <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordReset} />
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
        options={({ navigation }) => ({
          title: "Exact Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="FoundLabelRecoveryLocation"
        component={FoundLabelRecoveryLocation}
        options={({ navigation }) => ({
          title: "Recovery Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
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
      <Stack.Screen name="Home" component={VerificationLanding} />
      <Stack.Screen name="VerificationAction" component={VerificationAction} />
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
        options={({ navigation }) => ({
          title: "Exact Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="FoundLabelRecoveryLocation"
        component={FoundLabelRecoveryLocation}
        options={({ navigation }) => ({
          title: "Recovery Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
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
      <Stack.Screen name="Home" component={AcceptTermsLanding} />
      <Stack.Screen name="AcceptTermsAction" component={AcceptTermsAction} />
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
        options={({ navigation }) => ({
          title: "Exact Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="FoundLabelRecoveryLocation"
        component={FoundLabelRecoveryLocation}
        options={({ navigation }) => ({
          title: "Recovery Location",
          gestureEnabled: false,
          headerLeft: () => <NavigationWithBack navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

/*
  Tab navigator for the app screens.
  This is a tab navigator that is the root navigator
*/
const AppTabNavigator: React.FC = () => {
  return (
    <CheckoutProvider>
      <LabelsProvider>
        <NotificationsProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,

              tabBarStyle: { paddingTop: 10 },
              tabBarActiveTintColor: tw.color("primary-200"),
              tabBarInactiveTintColor: tw.color("gray-400"),
            }}
          >
            <Tab.Screen
              name="App"
              component={AppStackNavigator}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="home" size={26} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Store"
              component={StoreStackNavigator}
              options={{
                tabBarLabel: "Store",
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="pricetags" size={26} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Checkout"
              component={CheckoutStackNavigator}
              options={{
                tabBarLabel: "Checkout",
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="cart" size={26} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackNavigator}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="person" size={26} color={color} />;
                },
              }}
            />
          </Tab.Navigator>
        </NotificationsProvider>
      </LabelsProvider>
    </CheckoutProvider>
  );
};

/*
  Stack navigator for the home screens.
  This is a stack navigator that is part of the 
  AppTabNavigator.
*/
const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
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
        initialParams={{ navigateTo: "Home" }}
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
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the store screens.
  This is a stack navigator that is part of the
  AppTabNavigator.
*/
const StoreStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen name="StoreLanding" component={StoreLanding} options={{ headerShown: false }} />
      <Stack.Screen name="StoreProduct" component={StoreProduct} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the checkout screens.
  This is a stack navigator that is part of the
  AppTabNavigator.
*/
const CheckoutStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="CheckoutLanding"
        component={CheckoutLanding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckoutAddress"
        component={CheckoutAddress}
        options={{ title: "Address" }}
      />
      <Stack.Screen
        name="CheckoutBilling"
        component={CheckoutBilling}
        options={{ title: "Billing" }}
      />
    </Stack.Navigator>
  );
};

/*
  Stack navigator for the profile screens.
  This is a stack navigator that is part of the 
  AppTabNavigator.
*/
const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="ProfileLanding"
        component={ProfileLanding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileUserInfo"
        component={ProfileUserInfo}
        options={{ title: "User Info" }}
      />
      <Stack.Screen
        name="ProfileDelete"
        component={ProfileDelete}
        options={{ title: "Delete Account" }}
      />
      <Stack.Screen
        name="ProfileNotifications"
        component={ProfileNotifications}
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="ProfileTransactions"
        component={ProfileTransactions}
        options={{ title: "Transactions" }}
      />
      <Stack.Screen
        name="ProfileTransactionDetails"
        component={ProfileTransactionDetails}
        options={{ title: "Transaction Details" }}
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
      {__DEV__ && (
        <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} options={{ title: "Admin" }} />
      )}
    </Stack.Navigator>
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
    Poppins_900Black,
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

  // This prevents the app from re-rendering after the user is loaded
  if (loading && lodash.isEmpty(user)) {
    return null;
  }

  if (isLoading || !fontsLoaded) {
    return null;
  }

  if (lodash.isEmpty(user)) {
    return <AuthStackNavigator />;
  }

  if (!user?.verified) {
    return <VerificationStackNavigator />;
  }

  if (!user?.termsAccepted) {
    return <AcceptTermsStackNavigator />;
  }

  return <AppTabNavigator />;
};

export default RootStackNavigator;
