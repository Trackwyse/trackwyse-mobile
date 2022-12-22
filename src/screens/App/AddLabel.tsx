import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Camera, CameraType } from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Text, ActivityIndicator } from "react-native";

import api from "@/api";
import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import BadgeButton from "@/components/BadgeButton";
import Permissions from "@/components/Permissions";
import { validateLabelUrl } from "@/lib/validators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLabels } from "@/contexts/Labels";

interface AddLabelScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const AddLabel: React.FC<AddLabelScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const { createLabel } = useLabels();
  const [hasBeenScanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const mutation = useMutation({
    mutationFn: (values: AddLabelInput) => {
      return api.addLabel(values, accessToken);
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
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Label Added",
            text2: "Your label has been added to your account",
          });
          createLabel(labelId);
          navigation.navigate("EditLabel", { labelId });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "This label has already been added to an account",
          });
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

      <View style={tw`flex items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Add a Label</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            To get started, scan the QR code on one of your labels.
          </Text>
        </View>
      </View>

      <View style={tw`mt-auto flex-row-reverse mb-10 w-11/12`}>
        {mutation.isError && hasBeenScanned && (
          <BadgeButton iconRight="camera-outline" size="lg" onPress={() => setScanned(false)}>
            Retry Scan
          </BadgeButton>
        )}
      </View>
    </View>
  );
};

export default AddLabel;