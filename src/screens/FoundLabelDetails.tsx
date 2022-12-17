import { useFormik } from "formik";
import { View, Text } from "react-native";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import { useAuth } from "../contexts/Auth";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import { validateFoundLabelDetailsInput } from "../lib/validators";

interface FoundLabelDetailsScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const FoundLabelDetails: React.FC<FoundLabelDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { accessToken } = useAuth();
  const { label }: { label: Label } = route.params;

  const modificationMutation = useMutation({
    mutationFn: (values: FoundLabelDetailsInput) => {
      return api.updateFoundLabelDetails(values, accessToken);
    },
  });

  const editInput = useFormik({
    initialValues: {
      id: label._id,
      phoneNumber: label.finderPhoneNumber || "",
      exactLocation: label.foundExactLocation || "",
      recoveryLocation: label.foundRecoveryLocation || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateFoundLabelDetailsInput,
    onSubmit: (values) => {
      modificationMutation.mutate(values, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Label updated",
            text2: "Thank you for recovering this label",
          });

          navigation.navigate("home");
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "There was an error updating the label",
          });
        },
      });
    },
  });

  return (
    <View>
      <KeyboardAwareScrollView
        contentContainerStyle={tw`items-center`}
        style={tw`h-full w-full`}
      >
        <View style={tw`w-full items-center`}>
          <View style={tw`w-11/12 pt-10`}>
            <Text style={tw`text-2xl font-bold`}>Label Details</Text>
            <Text style={tw`my-4 text-gray-400 text-base`}>
              Thank you for finding this label. The owner has been notified and
              has provided the following information.
            </Text>
          </View>

          <ListItem
            title="Item Name"
            textRight={label.name ? label.name : "Not provided"}
          />
          <ListItem
            title="Contact Number"
            position="middle"
            textRight={label.phoneNumber ? label.phoneNumber : "Not provided"}
          />
          <ListItem
            title="Message"
            position="bottom"
            {...(label.message
              ? { textBottom: label.message }
              : { textRight: "Not provided" })}
          />
        </View>

        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Update Information</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Would you like to provide your contact information or a recovery
            address to the owner? If so, please fill out the form below.
          </Text>
        </View>

        <Input
          placeholder="Phone Number"
          size="lg"
          style={tw`my-1`}
          keyboardType="numeric"
          disabled={modificationMutation.isLoading}
          value={editInput.values.phoneNumber}
          error={editInput.errors.phoneNumber}
          onChangeText={editInput.handleChange("phoneNumber")}
        />

        <Input
          placeholder="Found At"
          size="lg"
          style={tw`my-1`}
          value={editInput.values.exactLocation}
          disabled={modificationMutation.isLoading}
          onChangeText={editInput.handleChange("exactLocation")}
        />

        <Input
          placeholder="Recovery Location"
          size="lg"
          style={tw`my-1`}
          value={editInput.values.recoveryLocation}
          disabled={modificationMutation.isLoading}
          onChangeText={editInput.handleChange("recoveryLocation")}
        />

        <View style={tw`w-full items-center`}>
          <View style={tw`w-11/12 pt-10`}>
            <Text style={tw`text-2xl font-bold`}>Privacy Details</Text>
            <Text style={tw`my-4 text-gray-400 text-base`}>
              Your approximate location has been shared with the owner. You can
              view what information is being shared with the owner below.
            </Text>
          </View>

          <ListItem
            title="Approximate Location"
            position="alone"
            textRight={label.foundNear ? label.foundNear : "Not provided"}
          />
        </View>

        <Button
          size="lg"
          style={tw`my-10`}
          loading={modificationMutation.isLoading}
          onPress={() => editInput.handleSubmit()}
        >
          Send Information
        </Button>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FoundLabelDetails;
