import api from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ListItem from "@/components/ListItem";
import { useAuth } from "@/contexts/Auth";
import tw from "@/lib/tailwind";
import { validateUpdateUserPasswordInput } from "@/lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: UpdateUserPasswordInput) => {
      return api.updateUserPassword(values, accessToken);
    },
  });

  const userInfoInput = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateUpdateUserPasswordInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Your password has been updated successfully",
          });

          navigation.goBack();
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            const { message } = err.response?.data;
            userInfoInput.setErrors({ currentPassword: message });
          }
        },
      });
    },
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={tw`items-center`} style={tw`h-full w-full`}>
      <View style={tw`w-11/12 pt-10`}>
        <Text style={tw`text-2xl font-bold`}>Update Password</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your password. Make sure to choose a strong password that you don't use anywhere
          else.
        </Text>
      </View>

      <Input
        secureTextEntry
        placeholder="Current Password"
        size="lg"
        style={tw`my-1`}
        value={userInfoInput.values.currentPassword}
        disabled={mutation.isLoading}
        error={userInfoInput.errors.currentPassword}
        onChangeText={userInfoInput.handleChange("currentPassword")}
      />
      <Input
        secureTextEntry
        placeholder="New Password"
        size="lg"
        style={tw`my-1`}
        value={userInfoInput.values.newPassword}
        disabled={mutation.isLoading}
        error={userInfoInput.errors.newPassword}
        onChangeText={userInfoInput.handleChange("newPassword")}
      />
      <Input
        secureTextEntry
        placeholder="Confirm New Password"
        size="lg"
        style={tw`my-1`}
        value={userInfoInput.values.confirmPassword}
        disabled={mutation.isLoading}
        error={userInfoInput.errors.confirmPassword}
        onChangeText={userInfoInput.handleChange("confirmPassword")}
      />
      <Button
        size="lg"
        style={tw`mt-2`}
        loading={mutation.isLoading}
        onPress={() => userInfoInput.handleSubmit()}
      >
        Update
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
