import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import tw from "../lib/tailwind";
import apiClient from "../api";
import { validateLabelUrl } from "../lib/validators";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/Auth";
import Toast from "react-native-toast-message";

const AddLabel: React.FC = () => {
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (values: AddLabelInput) => {
      return apiClient.addLabel({ ...values, accessToken });
    },
  });

  const [isscanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  });

  const onBarCodeScanned = (scanned: any) => {
    const { type, data } = scanned;

    if (!validateLabelUrl(data))
      return Toast.show({
        type: "error",
        text1: "Invalid QR Code",
        text2: "Please scan a valid QR code from a label",
      });

    if (isscanned) return;

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
          alert(error);

          Toast.show({
            type: "error",
            text1: "Error",
            text2: "This label has already been added to an account",
          });

          setScanned(false);
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
        style={tw`flex-1 max-h-1/2`}
        type={CameraType.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onBarCodeScanned}
      />

      <View style={tw`flex items-center`}>
        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Add a Label</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            To get started, scan the QR code on one of your labels.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddLabel;
