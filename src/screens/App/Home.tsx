/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useEffect, useMemo, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

import Label from "@/components/Label";
import { useAuth } from "@/contexts/Auth";
import { getRandomColor } from "@/lib/random";
import { useLabels } from "@/contexts/Labels";
import { trimToLength } from "@/lib/textUtil";
import Container from "@/components/Container";
import Banner from "@/components/Banner/Banner";
import IconButton from "@/components/IconButton";
import HomeLoader from "@/components/Loaders/Home";
import useRefreshControl from "@/hooks/useRefreshControl";

interface HomeProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { loading, labels, getLabels } = useLabels();
  const { refreshing, onRefresh } = useRefreshControl();

  if (loading && !refreshing) return <HomeLoader />;

  return (
    <SafeAreaView>
      <Container>
        <View style={tw`flex-row justify-between items-center mb-8`}>
          <Text style={tw`font-bold text-3xl`}>
            Welcome {trimToLength(user?.firstName, 8) || ""}
          </Text>
          <IconButton
            icon="ios-settings-sharp"
            size={25}
            filled
            onPress={() => navigation.navigate("ProfileLanding")}
          />
        </View>

        <FlatList
          style={tw`mb-32`}
          data={labels}
          ListHeaderComponent={<ListHeader navigation={navigation} firstLabel={labels[0]} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: label }) => <Label label={label} />}
          ListFooterComponent={<View style={tw`h-32`} />} // Add padding to bottom of list
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(getLabels)} />
          }
        />
      </Container>
    </SafeAreaView>
  );
};

interface ListHeaderProps {
  firstLabel: Label | undefined;
  navigation: NativeStackNavigationProp<any>;
}

const ListHeader: React.FC<ListHeaderProps> = ({ navigation }) => {
  const bannerColor = useMemo(() => getRandomColor(), []);

  return (
    <View>
      {/* TODO: Move to component */}
      <Banner
        title="Do more with Trackwyse Plus"
        cta="Learn More"
        bgColor={bannerColor}
        onPress={() => navigation.navigate("ProfilePremium")}
      />
      {/* END TODO */}

      <View style={tw`mt-8`}>
        <Text variant="title" disableDefaultPadding>
          Actions
        </Text>

        <View style={tw`mt-4 justify-between flex-row`}>
          <TouchableOpacity
            style={tw`items-center w-28`}
            onPress={() => navigation.navigate("AddLabel")}
          >
            <IconButton
              pressable={false}
              icon="camera"
              filled
              size={35}
              fillColor={tw.color("green-100")}
            />
            <Text style={tw`font-medium text-base mt-4 `}>Add Label</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`items-center w-28`}
            onPress={() => navigation.navigate("FoundLabelScan")}
          >
            <IconButton
              pressable={false}
              icon="location-sharp"
              filled
              size={35}
              fillColor={tw.color("purple-100")}
            />
            <Text style={tw`font-medium text-base mt-4`}>Found Label</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`items-center w-28`}
            onPress={() => navigation.navigate("ProfilePremium")}
          >
            <IconButton
              pressable={false}
              icon="gift-sharp"
              filled
              size={35}
              fillColor={tw.color("yellow-100")}
            />
            <Text style={tw`font-medium text-base mt-4`}>Trackwyse+</Text>
          </TouchableOpacity>
        </View>

        <Text variant="title" style={tw`mt-8`} disableDefaultPadding>
          Your Labels
        </Text>
      </View>
    </View>
  );
};

export default Home;
