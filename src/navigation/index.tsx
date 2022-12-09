import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Landing from "../screens/Landing";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen
        name="register"
        component={Register}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
          ),
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
          ),
          headerTitle: "",
        })}
      />
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
