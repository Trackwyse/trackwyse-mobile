/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View, ScrollView, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { PremiumHeader } from "@/components/Header";
import { convertDateToReadable } from "@/lib/util/date";
import PremiumLoader from "@/components/Loaders/Premium";
import useRefreshControl from "@/hooks/useRefreshControl";
import useAuthenticatedQuery from "@/hooks/useAuthenticatedQuery";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefreshControl();

  const subscriptionQuery = useAuthenticatedQuery({
    queryKey: ["subscription"],
    queryFn: ({ queryKey }) => {
      const [accessToken] = queryKey;

      return api.getSubscription(accessToken);
    },
  });

  if (subscriptionQuery.isLoading)
    return (
      <View>
        <PremiumHeader
          title="Trackwyse Plus"
          subtitle="Manage Your Subscription"
          navigation={navigation}
        />
        <PremiumLoader />
      </View>
    );

  return (
    <View>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle="Manage Your Subscription"
        navigation={navigation}
      />

      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw` pb-5`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh(subscriptionQuery.refetch)}
            />
          }
        >
          <Text variant="premium_title">Subscription</Text>
          <Text variant="premium_subtitle">
            You can manage your subscription through your iCloud subscriptions page.
          </Text>

          <ListItem
            style={tw`mt-5`}
            title="Subscribed Since"
            textRight={convertDateToReadable(
              new Date(subscriptionQuery.data?.data.subscriptionDate as string)
            )}
          />
          <ListItem
            title="Next Payment"
            position="bottom"
            textRight={convertDateToReadable(
              new Date(subscriptionQuery.data?.data.subscriptionReceipt.expirationDate as number)
            )}
          />

          <Text variant="premium_title">Features</Text>
          <Text variant="premium_subtitle">
            You can enable/disable certain premium benefits below.
          </Text>

          <ListItem
            pressable
            style={tw`mt-5`}
            position="alone"
            title="Redeem Free Tracking Labels"
            iconRight="md-chevron-forward-outline"
            onPress={() => navigation.navigate("ProfilePremiumClaim")}
          />
        </ScrollView>
      </Container>
    </View>
  );
};

export default Profile;
