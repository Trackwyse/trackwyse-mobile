import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/App/Home";
import Login from "../screens/Auth/Login";
import Landing from "../screens/Auth/Landing";

import Register from "../screens/Auth/Register.1";
import Register2 from "../screens/Auth/Register.2";

import AddLabel from "../screens/App/AddLabel";
import EditLabel from "../screens/App/ModifyLabel";

import ProfileRate from "../screens/Profile/Profile.Rate";
import ProfileShare from "../screens/Profile/Profile.Share";
import ProfileHelp from "../screens/Profile/Profile.Help";
import ProfileAbout from "../screens/Profile/Profile.About";
import ProfileLanding from "../screens/Profile/Profile.Landing";
import ProfileUserInfo from "../screens/Profile/Profile.UserInfo";
import ProfilePurchase from "../screens/Profile/Profile.Purchase";

import ForgotPassword from "../screens/Auth/ForgotPassword.1";
import ForgotPassword2 from "../screens/Auth/ForgotPassword.2";
import ForgotPassword3 from "../screens/Auth/ForgotPassword.3";

import AcceptTermsAction from "../screens/Terms/AcceptTerms.Action";
import AcceptTermsLanding from "../screens/Terms/AcceptTerms.Landing";

import VerificationAction from "../screens/Verification/Verification.Action";
import VerificationLanding from "../screens/Verification/Verification.Landing";

import { useAuth } from "../contexts/Auth";
import IconButton from "../components/IconButton";
import FoundLabel from "../screens/App/FoundLabel";
import { LabelsProvider } from "../contexts/Labels";
import FoundLabelDetails from "../screens/App/FoundLabelDetails";
import NavigationWithBack from "../components/Navigation/NavigationBackArrow";

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
      <Stack.Screen name="landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="register2" component={Register2} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="forgotPassword2" component={ForgotPassword2} />
      <Stack.Screen name="forgotPassword3" component={ForgotPassword3} />
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
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: ``,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="addLabel"
          component={AddLabel}
          options={({ navigation }) => ({
            title: "Add Label",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileLanding"
          component={ProfileLanding}
          options={({ navigation }) => ({
            title: "Profile",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileUserInfo"
          component={ProfileUserInfo}
          options={({ navigation }) => ({
            title: "User Info",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfilePurchase"
          component={ProfilePurchase}
          options={({ navigation }) => ({
            title: "Purchase",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileAbout"
          component={ProfileAbout}
          options={({ navigation }) => ({
            title: "About",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileRate"
          component={ProfileRate}
          options={({ navigation }) => ({
            title: "Rate",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileShare"
          component={ProfileShare}
          options={({ navigation }) => ({
            title: "Share",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileHelp"
          component={ProfileHelp}
          options={({ navigation }) => ({
            title: "Help",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="foundLabel"
          component={FoundLabel}
          options={({ navigation }) => ({
            title: "Found Label",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="foundLabelDetails"
          component={FoundLabelDetails}
          options={({ navigation }) => ({
            title: "Found Label",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} returnHome />,
          })}
        />
        <Stack.Screen
          name="editLabel"
          component={EditLabel}
          options={({ navigation }) => ({
            title: "Edit Label",
            gestureEnabled: false,
            headerLeft: () => <NavigationWithBack navigation={navigation} returnHome />,
            headerRight: () => <IconButton icon="trash-outline" color="firebrick" />,
          })}
        />
      </Stack.Navigator>
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
  const { loading, accessToken, user } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!accessToken) {
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
