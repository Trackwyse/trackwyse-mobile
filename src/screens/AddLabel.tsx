import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "../lib/tailwind";
import apiClient from "../api";
import { validateLabelUrl } from "../lib/validators";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/Auth";
import Toast from "react-native-toast-message";
import BadgeButton from "../components/BadgeButton";

const AddLabel: React.FC = () => {
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (values: AddLabelInput) => {
      return apiClient.addLabel({ ...values, accessToken });
    },
  });

  const [hasBeenScanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
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

  if (permission === null) {
    return <View></View>;
  }

  if (permission.granted === false) {
    return <Text>No access to camera</Text>;
  }

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
