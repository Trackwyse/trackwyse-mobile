/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import * as RNLinking from "expo-linking";
import BottomSheet from "@gorhom/bottom-sheet";
import { View, SafeAreaView } from "react-native";
import { useRef, useMemo, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import RNMapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import InfoCard from "@/components/InfoCard";
import useLocation from "@/hooks/useLocation";
import Container from "@/components/Container";
import { formatSeconds } from "@/lib/util/string";
import IconButton from "@/components/IconButton";
import MapsLoader from "@/components/Loaders/Maps";

interface MapViewProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const MapView: React.FC<MapViewProps> = ({ route, navigation }) => {
  const { accessToken } = useAuth();
  const { location, loading } = useLocation();
  const snapPoints = useMemo(() => ["45%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { address }: { address: LabelAddress } = route.params;

  const distanceMutation = useMutation({
    mutationFn: () => {
      const origin = `${location?.coords.latitude},${location?.coords.longitude}`;
      const destination = `${address.latitude},${address.longitude}`;
      return api.getDistance({ origin, destination }, accessToken);
    },
  });

  const onGoogleMapsPress = () => {
    const url = `comgooglemaps://?api=1&daddr=${address.latitude},${address.longitude}`;
    RNLinking.openURL(url);
  };

  const onAppleMapsPress = () => {
    const url = `http://maps.apple.com/?daddr=${address.latitude},${address.longitude}`;
    RNLinking.openURL(url);
  };

  useEffect(() => {
    if (!loading) {
      distanceMutation.mutate();
    }
  }, [loading]);

  return (
    <View style={tw`w-full h-full`}>
      <RNMapView
        style={tw`absolute w-full h-2/3`}
        showsUserLocation
        region={{
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.075,
          longitudeDelta: 0.075,
        }}
      >
        <Marker coordinate={{ latitude: address.latitude, longitude: address.longitude }} />
      </RNMapView>

      <SafeAreaView style={tw`w-full`}>
        <Container>
          <IconButton
            filled
            color="white"
            icon="arrow-back"
            style={tw`my-4`}
            size={24}
            fillColor={tw.color("primary-200")}
            onPress={() => navigation.goBack()}
          />
        </Container>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Container>
          {loading || distanceMutation.isLoading ? (
            <MapsLoader />
          ) : (
            <View style={tw`h-full justify-between`}>
              <View>
                <InfoCard
                  title={address.address1}
                  subtitle={address.city + ", " + address.state + " " + address.zip5}
                  iconLeft="globe-outline"
                  style={tw`mt-3`}
                />

                {distanceMutation.data?.data.distance && (
                  <InfoCard
                    title="Distance to Location"
                    subtitle={formatSeconds(
                      distanceMutation.data?.data.distance.expectedTravelTimeSeconds
                    )}
                    iconLeft="navigate-circle-outline"
                    style={tw`mt-4`}
                  />
                )}
              </View>
              <View>
                <Button color="secondary" onPress={onGoogleMapsPress}>
                  Open in Google Maps
                </Button>
                <Button style={tw`mt-4 mb-4`} onPress={onAppleMapsPress}>
                  Open in Apple Maps
                </Button>
              </View>
            </View>
          )}
        </Container>
      </BottomSheet>
    </View>
  );
};

export default MapView;
