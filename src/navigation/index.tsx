import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Landing from "../screens/Landing";
import Register from "../screens/Register.1";
import Register2 from "../screens/Register.2";
import Verify1 from "../screens/Verify.1";
import Verify2 from "../screens/Verify.2";
import Terms from "../screens/Terms";
import NavigationWithBack from "../components/Navigation/NavigationBackArrow";
import { useAuth } from "../contexts/Auth";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        title: "",
        gestureEnabled: false,
        headerLeft: () => <NavigationWithBack navigation={navigation} />,
      })}
    >
      <Stack.Screen name="landing" component={Landing} options={{ headerLeft: () => <></> }} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="register2" component={Register2} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

const VerificationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="verify1" component={Verify1} />
      <Stack.Screen name="verify2" component={Verify2} />
    </Stack.Navigator>
  );
};

const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

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

  return <AppStackNavigator />;
};

export default RootStackNavigator;
