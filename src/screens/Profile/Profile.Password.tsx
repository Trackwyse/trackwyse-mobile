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
import errorHandler from "@/lib/errorHandler";
import Container from "@/components/Container";
import { validateUpdateUserPasswordInput } from "@/lib/validators";

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
        <Text variant="title">Update Password</Text>
        <Text variant="subtitle">
          Update your password. Make sure to choose a strong password that you don't use anywhere
          else.
        </Text>

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
    </Container>
  );
};

export default Profile;
