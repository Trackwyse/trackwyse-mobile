import { useEffect } from "react";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../api";
import tw from "../lib/tailwind";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/Auth";
import { useLabels } from "../contexts/Labels";
import { validateModifyLabelInput } from "../lib/validators";
import IconButton from "../components/IconButton";

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
  const { labels, updateLabel, deleteLabel } = useLabels();

  const label = labels.find((label) => label._id === labelId) as Label;

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

          updateLabel({ ...label, ...values });
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
                deleteLabel(label);
                navigation.navigate("home");
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
    <View style={tw`h-full`}>
      <KeyboardAvoidingView style={tw`items-center justify-end flex-1`}>
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

        <View style={tw`flex-1`} />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={tw`items-center mt-auto mb-10  `}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Button
          size="lg"
          loading={modificationMutation.isLoading}
          onPress={() => editInput.handleSubmit()}
        >
          Update
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ModifyLabel;
