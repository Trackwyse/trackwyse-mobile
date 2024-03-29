/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { validateUpdateUserInput } from "@/lib/validators";
import errorHandler from "@/lib/errorHandler";

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
        onError: (err) => {
          errorHandler.handle(err, userInfoInput);
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
        <Text variant="title">User Info</Text>
        <Text variant="subtitle">
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

        <Text variant="title">Security</Text>
        <Text variant="subtitle">Update your secure information. Only you can view this data.</Text>

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
          position="middle"
          onPress={() => navigation.navigate("ProfileAddress")}
        />
        <ListItem
          pressable
          title="Delete Account"
          iconRight="md-chevron-forward-outline"
          position="bottom"
          textColor="red"
          style={tw`mb-10`}
          onPress={() => navigation.navigate("ProfileDelete")}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Profile;
