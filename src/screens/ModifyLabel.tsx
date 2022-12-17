import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/Auth";
import { useLabels } from "../contexts/Labels";
import { validateModifyLabelInput } from "../lib/validators";
import IconButton from "../components/IconButton";
import ColorSelector from "../components/ColorSelector";
import { colors } from "../components/ColorSelector/ColorSelector";
import ListItem from "../components/ListItem";

interface ModifyLabelScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const ModifyLabel: React.FC<ModifyLabelScreenProps> = ({
  route,
  navigation,
}) => {
  const { labelId } = route.params;
  const { accessToken } = useAuth();
  const { labels, updateLabel, deleteLabel, getLabels } = useLabels();
  const [refreshing, setRefreshing] = useState(false);

  const label = labels.find((label) => label._id === labelId) as Label;

  const onRefresh = async () => {
    setRefreshing(true);
    await getLabels();
    setRefreshing(false);
  };

  const modificationMutation = useMutation({
    mutationFn: (values: ModifyLabelInput) => {
      return api.modifyLabel(values, accessToken);
    },
  });

  const deletionMutation = useMutation({
    mutationFn: () => {
      return api.deleteLabel({ id: labelId }, accessToken);
    },
  });

  const editInput = useFormik({
    initialValues: {
      id: labelId,
      // Color key that returns an index of the color in the colors array, or 0 if the color is not found
      color: colors.findIndex((color) => color.bg === label.color?.bg) || 0,
      name: label?.name || "",
      phoneNumber: label?.phoneNumber || "",
      message: label?.message || "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateModifyLabelInput,
    onSubmit: (values) => {
      modificationMutation.mutate(values, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Label Updated",
            text2: "Your label has been updated successfully",
          });

          updateLabel({
            ...label,
            ...values,
            color: colors[values.color as number],
          });
          navigation.navigate("home");
        },
        onError: (err) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "There was an error updating your label",
          });
        },
      });
    },
  });

  // Update the header to include a deletion button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="trash-outline"
          color="firebrick"
          onPress={() => {
            deletionMutation.mutate(undefined, {
              onSuccess: () => {
                navigation.navigate("home");
                deleteLabel(label);
                Toast.show({
                  type: "success",
                  text1: "Label Deleted",
                  text2: "Your label has been deleted successfully",
                });
              },
              onError: (err) => {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "There was an error deleting your label",
                });
              },
            });
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <KeyboardAwareScrollView
        contentContainerStyle={tw`items-center`}
        style={tw`h-full w-full`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {label.isLost && (
          <View style={tw`w-full items-center`}>
            <View style={tw`w-11/12 pt-10`}>
              <Text style={tw`text-2xl font-bold`}>Label Recovered</Text>
              <Text style={tw`my-4 text-gray-400 text-base`}>
                Your label has been located by another user. Make sure that your
                information is up to date.
              </Text>
            </View>

            <ListItem title="Currently Lost" iconRight="checkmark-outline" />
            <ListItem
              title="Recoverable"
              position="middle"
              iconRight={
                label.foundRecoveryPossible
                  ? "checkmark-outline"
                  : "close-outline"
              }
            />
            <ListItem
              title="Contact Number"
              position="middle"
              textRight={
                label.finderPhoneNumber
                  ? label.finderPhoneNumber
                  : "Not provided"
              }
            />
            <ListItem
              title="Found Near"
              position="middle"
              textRight={label.foundNear ? label.foundNear : "Not provided"}
            />
            <ListItem
              title="Found At"
              position="middle"
              textRight={
                label.foundExactLocation
                  ? label.foundExactLocation
                  : "Not provided"
              }
            />
            <ListItem
              title="Recovery Location"
              position="bottom"
              textRight={
                label.foundRecoveryLocation
                  ? label.foundRecoveryLocation
                  : "Not provided"
              }
            />
          </View>
        )}

        <View style={tw`w-11/12 pt-10`}>
          <Text style={tw`text-2xl font-bold`}>Edit Label</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
            Update details about your label in order to have the best chance of
            finding a lost item.
          </Text>
        </View>

        <Input
          placeholder="Tracker Name"
          size="lg"
          style={tw`my-1`}
          value={editInput.values.name}
          disabled={modificationMutation.isLoading}
          onChangeText={editInput.handleChange("name")}
        />
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
          placeholder="Message"
          size="lg"
          style={tw`my-1 h-32`}
          multiline
          disabled={modificationMutation.isLoading}
          value={editInput.values.message}
          onChangeText={editInput.handleChange("message")}
        />

        <ColorSelector
          style={tw`my-5`}
          onChange={(value: number) => editInput.setFieldValue("color", value)}
          value={editInput.values.color}
        />

        <Button
          size="lg"
          style={tw`mb-10`}
          loading={modificationMutation.isLoading}
          onPress={() => editInput.handleSubmit()}
        >
          Update
        </Button>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ModifyLabel;
