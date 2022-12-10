import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Landing from "../screens/Landing";
import Register from "../screens/Register.1";
import Register2 from "../screens/Register.2";
import Register3 from "../screens/Register.3";
import Register4 from "../screens/Register.4";
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
      <Stack.Screen
        name="landing"
        component={Landing}
        options={{ headerLeft: () => <></> }}
      />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="register2" component={Register2} />
      <Stack.Screen name="register3" component={Register3} />
      <Stack.Screen name="register4" component={Register4} />
      <Stack.Screen name="login" component={Login} />
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
  const { loading, accessToken } = useAuth();

  if (loading) {
    return <></>;
  }

  if (accessToken) {
    return <AppStackNavigator />;
  }

  return <AuthStackNavigator />;
};

export default RootStackNavigator;
