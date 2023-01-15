/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Camera, CameraType } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Container from "@/components/Container";
import BadgeButton from "@/components/BadgeButton";
import Permissions from "@/components/Permissions";
import { validateLabelUrl } from "@/lib/validators";
import { useDynamicLabels } from "@/contexts/DynamicLabels";

interface FoundLabelScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const FoundLabel: React.FC<FoundLabelScreenProps> = ({ navigation }) => {
  const { setFoundLabel } = useDynamicLabels();
  const [hasBeenScanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const mutation = useMutation({
    mutationFn: (values: FoundLabelDetailsInput) => {
      return api.updateFoundLabelDetails(values);
    },
  });

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

    mutation.mutate(
      { id: labelId },
      {
        onSuccess: ({ data }) => {
          Toast.show({
            type: "success",
            text1: "Label Found",
            text2: "The owner of this label has been notified",
          });
          setFoundLabel(data.label);
          navigation.navigate("FoundLabelDetails", {
            label: data.label,
          });
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            const statusCode = err.response?.data.message;
            Toast.show({
              type: "error",
              text1: "An error occurred",
              text2: statusCode,
            });
          }
        },
      }
    );
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
      >
        {(mutation.isLoading || mutation.isError) && hasBeenScanned && (
          <View style={tw`bg-black absolute w-full h-full opacity-90 justify-center`}>
            {mutation.isLoading && <ActivityIndicator size={"large"} color="white" />}
          </View>
        )}
      </Camera>

      <Container>
        <Text variant="title">Found a Label</Text>
        <Text variant="subtitle">
          Found a lost item with a label? Scan the QR code to alert the owner, and optionally
          provide your contact information.
        </Text>
      </Container>

      <Container outerStyle={tw`mt-auto mb-10`} style={tw`flex-row-reverse`}>
        {mutation.isError && hasBeenScanned && (
          <BadgeButton iconRight="camera-outline" size="lg" onPress={() => setScanned(false)}>
            Retry Scan
          </BadgeButton>
        )}
      </Container>
    </View>
  );
};

export default FoundLabel;
