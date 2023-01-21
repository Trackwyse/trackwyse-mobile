/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useFormik } from "formik";
import Modal from "react-native-modal";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { View, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import { useLabels } from "@/contexts/Labels";
import Container from "@/components/Container";
import IconButton from "@/components/IconButton";
import { convertDateToReadable } from "@/lib/util/date";
// import ColorSelector from "@/components/ColorSelector";
import useRefreshControl from "@/hooks/useRefreshControl";
import { validateModifyLabelInput } from "@/lib/validators";
import { colors } from "@/components/ColorSelector/ColorSelector";
import UnsavedChangesModal from "@/components/Modals/UnsavedChanges";
import useAuthenticatedMutation from "@/hooks/useAuthenticatedMutation";

interface ModifyLabelScreenProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const ModifyLabel: React.FC<ModifyLabelScreenProps> = ({ route, navigation }) => {
  const { labelId } = route.params;
  const { accessToken } = useAuth();
  const { refreshing, onRefresh } = useRefreshControl();
  const { labels, updateLabel, deleteLabel, getLabels } = useLabels();
  const [isUnsavedModalVisible, setIsUnsavedModalVisible] = useState(false);
  const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);

  const label = labels.find((label) => label.uniqueID === labelId) as Label;

  const modificationMutation = useMutation({
    mutationFn: (values: ModifyLabelInput) => {
      return api.modifyLabel(values, accessToken);
    },
  });
  // const modificationMutation = useAuthenticatedMutation({
  //   mutationFn: (values: ModifyLabelInput) => {
  //     return api.modifyLabel(values, accessToken);
  //   },
  // })

  const deletionMutation = useMutation({
    mutationFn: () => {
      return api.deleteLabel({ id: labelId }, accessToken);
    },
  });

  const recoveryMutation = useMutation({
    mutationFn: () => {
      return api.recoverLabel({ id: labelId }, accessToken);
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
        onSuccess: ({ data }) => {
          Toast.show({
            type: "success",
            text1: "Label Updated",
            text2: "Your label has been updated successfully",
          });

          updateLabel(data.label);
          navigation.navigate("Home");
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

  const onDeleteLabel = () => {
    deletionMutation.mutate(undefined, {
      onSuccess: () => {
        navigation.navigate("Home");
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
  };

  const onRecoverLabel = () => {
    recoveryMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        navigation.navigate("Home");
        updateLabel(data.label);
        Toast.show({
          type: "success",
          text1: "Label Recovered",
          text2: "Your label has been recovered successfully",
        });
      },
      onError: (err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "There was an error recovering your label",
        });
      },
    });
  };

  // Update the header to include a deletion button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="trash-outline"
          color="firebrick"
          onPress={() => {
            setIsDeletionModalVisible(true);
          }}
        />
      ),
      headerLeft: () => (
        <IconButton
          icon="arrow-back"
          size={25}
          onPress={() => {
            const hasChanged = editInput.values !== editInput.initialValues;

            if (hasChanged) {
              setIsUnsavedModalVisible(true);
            } else {
              navigation.navigate("Home");
            }
          }}
        />
      ),
    });
  }, [navigation, editInput.values, editInput.initialValues]);

  return (
    <Container>
      <UnsavedChangesModal
        isVisible={isUnsavedModalVisible}
        setVisible={setIsUnsavedModalVisible}
        onReturnPress={() => setIsUnsavedModalVisible(false)}
        onLeavePress={() => navigation.navigate("Home")}
      />
      <Modal
        animationInTiming={1}
        animationOutTiming={1}
        isVisible={isDeletionModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => setIsDeletionModalVisible(false)}
      >
        <View style={tw`items-center justify-center flex-1`}>
          <View style={tw`bg-white rounded-lg p-5 w-7/8`}>
            <Text variant="title" disableDefaultPadding>
              Delete Label
            </Text>
            <Text variant="subtitle">
              This action is irreversible. Are you sure you want to delete this label?
            </Text>
            <Button
              style={tw`w-full rounded-md my-1 py-2`}
              color="secondary"
              onPress={() => setIsDeletionModalVisible(false)}
            >
              Don't Delete
            </Button>
            <Button style={tw`w-full rounded-md py-2 my-1 bg-rose-600`} onPress={onDeleteLabel}>
              Delete (Irreversible)
            </Button>
          </View>
        </View>
      </Modal>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={tw`h-full w-full`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(getLabels)} />
        }
      >
        {label.isLost && (
          <View style={tw`w-full`}>
            <Text variant="title">Label Recovered</Text>
            <Text variant="subtitle">
              Your label has been located by another user. Make sure that your information is up to
              date.
            </Text>

            <ListItem title="Currently Lost" iconRight="checkmark-outline" />
            <ListItem
              title="Found On"
              position="middle"
              textRight={
                label.foundDate ? convertDateToReadable(new Date(label.foundDate)) : "Not Provided"
              }
            />
            <ListItem
              title="Contact Number"
              position="middle"
              textRight={label.finderPhoneNumber ? label.finderPhoneNumber : "Not provided"}
            />
            <ListItem
              title="Found Near"
              position="middle"
              textRight={label.foundNear ? label.foundNear : "Not provided"}
            />
            <ListItem
              title="Found At"
              position="middle"
              {...(label.foundExactLocation
                ? {
                    iconRight: "md-chevron-forward",
                    pressable: true,
                    onPress: () =>
                      navigation.navigate("MapView", { address: label.foundExactLocation }),
                  }
                : { textRight: "Not provided" })}
            />
            <ListItem
              title="Recovery Location"
              position="bottom"
              {...(label.foundRecoveryLocation
                ? {
                    iconRight: "md-chevron-forward",
                    pressable: true,
                    onPress: () =>
                      navigation.navigate("MapView", { address: label.foundRecoveryLocation }),
                  }
                : { textRight: "Not provided" })}
            />

            <Button
              style={tw`my-3`}
              size="lg"
              onPress={onRecoverLabel}
              loading={recoveryMutation.isLoading}
            >
              Mark as recovered
            </Button>
          </View>
        )}

        <Text variant="title">Edit Label</Text>
        <Text variant="subtitle">
          Update details about your label in order to have the best chance of finding a lost item.
        </Text>

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

        {/* <ColorSelector
          style={tw`my-5`}
          onChange={(value: number) => editInput.setFieldValue("color", value)}
          value={editInput.values.color}
        /> */}

        <Button
          size="lg"
          style={tw`mb-10 mt-5`}
          loading={modificationMutation.isLoading}
          onPress={() => editInput.handleSubmit()}
        >
          Update
        </Button>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default ModifyLabel;
