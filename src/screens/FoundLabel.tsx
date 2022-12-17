import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Camera, CameraType } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Text, ActivityIndicator } from "react-native";

import api from "../api";
import tw from "../lib/tailwind";
import { useAuth } from "../contexts/Auth";
import BadgeButton from "../components/BadgeButton";
import Permissions from "../components/Permissions";
import { validateLabelUrl } from "../lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLabels } from "../contexts/Labels";

interface FoundLabelScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const FoundLabel: React.FC<FoundLabelScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [hasBeenScanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const onBarCodeScanned = (scannedData: any) => {
    const { data } = scannedData;

    if (!validateLabelUrl(data))
      return Toast.show({
        type: "error",
        text1: "Invalid QR Code",
        text2: "Please scan a valid QR code from a label",
      });

    if (hasBeenScanned) return;

    const labelId = data.split("//")[1];

    setScanned(true);
  };

  useEffect(() => {
    requestPermission();
  });

  if (permission?.status !== "granted")
    return (
      <Permissions
        title="Missing Permissions"
        description="This app requires access to your camera to scan QR codes. Please enable camera access in
  your device settings."
      />
    );

  return (
    <View style={tw`flex-1`}>
      <Camera
        style={tw`flex-1 max-h-1/2 relative`}
        type={CameraType.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onBarCodeScanned}
      ></Camera>

      <View style={tw`flex items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Found a Label</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Found a lost item with a label? Scan the QR code to alert the owner,
            and optionally provide your contact information.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FoundLabel;
