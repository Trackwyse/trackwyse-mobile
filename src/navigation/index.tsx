import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Landing from "../screens/Landing";

const Stack = createNativeStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

const AppStackNavigator: React.FC = () => {
  return <></>;
};

const RootStackNavigator: React.FC = () => {
  return <AuthStackNavigator />;
};

export default RootStackNavigator;
