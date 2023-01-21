/*
 * Created on Tue Jan 17 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Toast from "react-native-toast-message";

import api from "@/api";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import useAuthenticatedMutation from "@/hooks/useAuthenticatedMutation";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const { user, accessToken } = useAuth();

  const setPremiumMutation = useAuthenticatedMutation({
    mutationFn: (values) => {
      return api.setPremium({ id: user.id, ...values });
    },
  });

  const handleSetPremium = () => {
    setPremiumMutation.mutate(
      {},
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "User is now premium",
          });
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong",
          });
        },
      }
    );
  };

  return (
    <Container>
      <Text variant="title">Force Admin</Text>
      <Text variant="subtitle">Enable premium for 5 minutes on your account.</Text>
      <Button size="lg" loading={setPremiumMutation.isLoading} onPress={handleSetPremium}>
        Set Self Premium
      </Button>
    </Container>
  );
};

export default Profile;
