import { useFormik } from "formik";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { validateUpdateUserInput } from "@/lib/validators";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, accessToken, updateUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (values: UpdateUserInput) => {
      return api.updateUser(values, accessToken);
    },
  });

  const userInfoInput = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateUpdateUserInput,
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: ({ data }) => {
          updateUser(data.user);

          Toast.show({
            type: "success",
            text1: "Success",
            text2: "User info updated successfully",
          });
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "There was an error updating your account",
          });
        },
      });
    },
  });

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={tw`h-full w-full`}
      >
        <Text style={tw`text-2xl font-bold pt-10`}>User Info</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your personal information. Only you can view this data.
        </Text>

        <Input
          placeholder="First Name"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.firstName}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.firstName}
          onChangeText={userInfoInput.handleChange("firstName")}
        />
        <Input
          placeholder="Last Name"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.lastName}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.lastName}
          onChangeText={userInfoInput.handleChange("lastName")}
        />
        <Input
          placeholder="Email"
          size="lg"
          style={tw`my-1`}
          value={userInfoInput.values.email}
          disabled={mutation.isLoading}
          error={userInfoInput.errors.email}
          onChangeText={userInfoInput.handleChange("email")}
        />
        <Button
          size="lg"
          style={tw`mt-2`}
          loading={mutation.isLoading}
          onPress={() => userInfoInput.handleSubmit()}
        >
          Update
        </Button>

        <Text style={tw`text-2xl font-bold pt-10`}>Security</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update your secure information. Only you can view this data.
        </Text>

        <ListItem
          pressable
          title="Update Password"
          iconRight="md-chevron-forward-outline"
          position="top"
          style={tw`mt-2`}
          onPress={() => navigation.navigate("ProfilePassword")}
        />
        <ListItem
          pressable
          title="Update Address"
          iconRight="md-chevron-forward-outline"
          position="bottom"
          style={tw`mb-10`}
          onPress={() => navigation.navigate("ProfileAddress")}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Profile;
