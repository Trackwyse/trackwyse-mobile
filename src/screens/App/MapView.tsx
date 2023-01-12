import BottomSheet from "@gorhom/bottom-sheet";
import { View, SafeAreaView } from "react-native";
import { useRef, useMemo, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import RNMapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import useLocation from "@/hooks/useLocation";
import Container from "@/components/Container";
import { formatSeconds } from "@/lib/textUtil";
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
            size={22}
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
                <View style={tw`flex-row mt-3`}>
                  <IconButton icon="globe-outline" filled pressable={false} size={30} />
                  <View style={tw`ml-5 shrink`}>
                    <Text style={tw`text-lg font-medium`}>{address.address1}</Text>
                    <Text variant="subtitle" disableDefaultPadding>
                      {address.city + ", " + address.state + " " + address.zip5}
                    </Text>
                  </View>
                </View>
                {distanceMutation.data?.data.distance && (
                  <View style={tw`flex-row mt-4`}>
                    <IconButton icon="navigate-circle-outline" filled pressable={false} size={30} />
                    <View style={tw`ml-5 shrink`}>
                      <Text style={tw`text-lg font-medium`}>Distance to Location</Text>
                      <Text variant="subtitle" disableDefaultPadding>
                        {formatSeconds(
                          distanceMutation.data?.data.distance.expectedTravelTimeSeconds
                        )}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View>
                <Button color="secondary" size="lg">
                  Open in Google Maps
                </Button>
                <Button size="lg" style={tw`mt-4 mb-8`}>
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
