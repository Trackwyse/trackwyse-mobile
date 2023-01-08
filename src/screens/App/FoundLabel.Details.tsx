import { useFormik } from "formik";
import Modal from "react-native-modal";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Input from "@/components/Input";
import { useAuth } from "@/contexts/Auth";
import Button from "@/components/Button";
import ListItem from "@/components/ListItem";
import IconButton from "@/components/IconButton";
import { useDynamicLabels } from "@/contexts/DynamicLabels";
import { validateFoundLabelDetailsInput } from "@/lib/validators";
import UnsavedChangesModal from "@/components/Modals/UnsavedChanges";
import { getAddressString } from "@/lib/textUtil";

interface FoundLabelDetailsScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const FoundLabelDetails: React.FC<FoundLabelDetailsScreenProps> = ({ route, navigation }) => {
  const { accessToken } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const { foundLabel, setFoundLabel } = useDynamicLabels();
  const [isModalVisible, setModalVisible] = useState(false);

  const modificationMutation = useMutation({
    mutationFn: (values: FoundLabelDetailsInput) => {
      return api.updateFoundLabelDetails(values, accessToken);
    },
  });

  const editInput = useFormik({
    initialValues: {
      phoneNumber: foundLabel.finderPhoneNumber || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateFoundLabelDetailsInput,
    onSubmit: (values) => {
      modificationMutation.mutate(
        { ...values, id: foundLabel._id },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Label updated",
              text2: "Thank you for recovering this label",
            });

            // update the found label to the new values
            setIsSaved(true);
            setFoundLabel({ ...foundLabel, ...values });
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "There was an error updating the label",
            });
          },
        }
      );
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="arrow-back"
          size={25}
          onPress={() => {
            const hasChanged = editInput.values !== editInput.initialValues && !isSaved;

            if (hasChanged) {
              setModalVisible(true);
            } else {
              navigation.navigate("Home");
            }
          }}
        />
      ),
    });
  }, [navigation, editInput.values, editInput.initialValues, isSaved]);

  return (
    <View>
      <UnsavedChangesModal
        isVisible={isModalVisible}
        setVisible={setModalVisible}
        onReturnPress={() => setModalVisible(false)}
        onLeavePress={() => navigation.navigate("Home")}
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`items-center`}
        style={tw`h-full w-full`}
      >
        <View style={tw`w-full items-center`}>
          <View style={tw`w-11/12 pt-10`}>
            <Text style={tw`text-2xl font-bold`}>Label Details</Text>
            <Text style={tw`my-4 text-gray-400 text-base`}>
              Thank you for finding this label. The owner has been notified and has provided the
              following information.
            </Text>
          </View>

          <ListItem
            title="Item Name"
            textRight={foundLabel?.name ? foundLabel?.name : "Not provided"}
          />
          <ListItem
            title="Contact Number"
            position="middle"
            textRight={foundLabel?.phoneNumber ? foundLabel?.phoneNumber : "Not provided"}
          />
          <ListItem
            title="Message"
            position="bottom"
            {...(foundLabel?.message
              ? { textBottom: foundLabel?.message }
              : { textRight: "Not provided" })}
          />
        </View>

        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Update Information</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Would you like to provide your contact information or a recovery address to the owner?
            If so, please fill out the form below.
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

        {foundLabel?.foundExactLocation ? (
          <ListItem
            pressable
            style={tw`my-1`}
            position="alone"
            title="Exact Location"
            iconRight="md-chevron-forward"
            textBottom={getAddressString(foundLabel?.foundExactLocation)}
            onPress={() => navigation.navigate("FoundLabelExactLocation")}
          />
        ) : (
          <Button
            color="secondary"
            size="lg"
            style={tw`my-1 justify-start`}
            textStyle={tw`text-lg font-normal text-gray-400`}
            onPress={() => navigation.navigate("FoundLabelExactLocation")}
          >
            Exact Location
          </Button>
        )}

        {foundLabel?.foundRecoveryLocation ? (
          <ListItem
            pressable
            style={tw`my-1`}
            position="alone"
            title="Recovery Location"
            iconRight="md-chevron-forward"
            textBottom={getAddressString(foundLabel?.foundRecoveryLocation)}
            onPress={() => navigation.navigate("FoundLabelRecoveryLocation")}
          />
        ) : (
          <Button
            color="secondary"
            size="lg"
            style={tw`my-1 justify-start`}
            textStyle={tw`text-lg font-normal text-gray-400`}
            onPress={() => navigation.navigate("FoundLabelRecoveryLocation")}
          >
            Recovery Location
          </Button>
        )}

        <View style={tw`w-full items-center`}>
          <View style={tw`w-11/12 pt-10`}>
            <Text style={tw`text-2xl font-bold`}>Privacy Details</Text>
            <Text style={tw`my-4 text-gray-400 text-base`}>
              Your approximate location has been shared with the owner. You can view what
              information is being shared with the owner below.
            </Text>
          </View>

          <ListItem
            title="Approximate Location"
            position="alone"
            textRight={foundLabel?.foundNear ? foundLabel?.foundNear : "Not provided"}
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
