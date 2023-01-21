/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Text from "@/components/Text";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import tw from "@/lib/tailwind";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/Auth";
import api from "@/api";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { accessToken, removeAllData } = useAuth();
  const deletionMutation = useMutation({
    mutationFn: async (values: DeleteUserAccountInput) => {
      return api.deleteUserAccount(values, accessToken);
    },
  });

  const deleteAccountInput = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      deletionMutation.mutate(values, {
        onSuccess: () => {
          removeAllData();
        },
        onError: () => {
          deleteAccountInput.setErrors({
            password: "Incorrect password",
          });
        },
      });
    },
  });

  return (
    <Container>
      <Text variant="title">Delete Account</Text>
      <Text variant="subtitle">
        Enter your current password to delete your account, all your data will be lost forever
      </Text>

      <Input
        size="lg"
        placeholder="Password"
        value={deleteAccountInput.values.password}
        disabled={deletionMutation.isLoading}
        error={deleteAccountInput.errors.password}
        onChangeText={deleteAccountInput.handleChange("password")}
      />
      <Button
        size="lg"
        style={tw`mt-4 bg-red-600`}
        loading={deletionMutation.isLoading}
        onPress={() => deleteAccountInput.handleSubmit()}
      >
        Delete Account (Permanent)
      </Button>
    </Container>
  );
};

export default Profile;
