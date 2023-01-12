import { useRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { View, SafeAreaView } from "react-native";
import RNMapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Container from "@/components/Container";
import IconButton from "@/components/IconButton";

interface MapViewProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const MapView: React.FC<MapViewProps> = ({ route, navigation }) => {
  const { address }: { address: LabelAddress } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["45%"], []);

  return (
    <View style={tw`w-full h-full`}>
      <RNMapView
        style={tw`absolute w-full h-2/3`}
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
        <Container style={tw`h-full justify-between`}>
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
            <View style={tw`flex-row mt-4`}>
              <IconButton icon="navigate-circle-outline" filled pressable={false} size={30} />
              <View style={tw`ml-5 shrink`}>
                <Text style={tw`text-lg font-medium`}>Distance to Location</Text>
                <Text variant="subtitle" disableDefaultPadding>
                  10 miles.
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Button color="secondary" size="lg">
              Open in Google Maps
            </Button>
            <Button size="lg" style={tw`mt-4 mb-8`}>
              Open in Apple Maps
            </Button>
          </View>
        </Container>
      </BottomSheet>
    </View>
  );
};

export default MapView;
