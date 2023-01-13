/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import Container from "@/components/Container";
import Hyperlink from "@/components/Hyperlink";
import IconButton from "@/components/IconButton";
import { PremiumHeader } from "@/components/Header";
import { useInAppPurchases } from "@/contexts/InAppPurchases";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { processing, createSubscription } = useInAppPurchases();

  return (
    <View style={tw`items-center`}>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle={
          user.subscriptionActive ? "You have access to these perks" : "Unlock additional perks"
        }
        navigation={navigation}
      />

      <ScrollView style={tw`w-11/12 `} contentContainerStyle={tw`pb-5`}>
        <Text variant="premium_title">Whats Included:</Text>

        <View style={tw`flex-row mt-5`}>
          <IconButton icon="cash-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Free Tracking Labels</Text>
            <Text variant="premium_subtitle">
              Request additional tracking labels every month at no extra cost.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="map-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Advanced Mapping</Text>
            <Text variant="subtitle" disableDefaultPadding>
              View item recovery information such as distance, fastest routes, and more.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="refresh-circle-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Recovery History</Text>
            <Text variant="subtitle" disableDefaultPadding>
              View the recovery history of your labels and previous finders contact information.
            </Text>
          </View>
        </View>

        <View style={tw`flex-row mt-3`}>
          <IconButton icon="shield-checkmark-outline" filled pressable={false} size={30} />
          <View style={tw`ml-5 shrink`}>
            <Text style={tw`text-lg font-medium`}>Secure Recoveries</Text>
            <Text variant="subtitle" disableDefaultPadding>
              Get added protection against fraud, with additional recovery location verification.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={tw.style(`bg-white flex-grow w-full items-center h-1/3 pt-6 rounded-3xl`, {
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        })}
      >
        <Container>
          <Button
            size="lg"
            disabled={user.subscriptionActive}
            loading={processing}
            onPress={() => createSubscription("TRACKWYSE_PLUS")}
          >
            {user.subscriptionActive ? "Already Subscribed" : "Subscribe for $7.99/mo"}
          </Button>
          <Hyperlink
            style={tw`w-11/12 mt-3`}
            textStyle={tw`no-underline text-center text-gray-400`}
          >
            By {user.subscriptionActive ? "being subscribed" : "subscribing"} to Trackwyse Plus, you
            have read and agree to our Terms and Conditions
          </Hyperlink>
        </Container>
      </View>
    </View>
  );
};

export default Profile;
