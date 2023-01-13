/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";
import Modal from "react-native-modal";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";

interface UnsavedChangesModalProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  onReturnPress: () => void;
  onLeavePress: () => void;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isVisible,
  setVisible,
  onReturnPress,
  onLeavePress,
}) => {
  return (
    <Modal
      animationInTiming={1}
      animationOutTiming={1}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      isVisible={isVisible}
      backdropOpacity={0.4}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={tw`items-center justify-center flex-1`}>
        <View style={tw`bg-white rounded-lg p-5 w-7/8`}>
          <Text variant="title" disableDefaultPadding>
            Wait!
          </Text>
          <Text variant="subtitle">
            You have unsaved changes. Are you sure you want to leave this page?
          </Text>
          <Button style={tw`w-full rounded-md my-1 py-2`} color="secondary" onPress={onLeavePress}>
            Leave Page
          </Button>
          <Button style={tw`w-full rounded-md py-2 my-1`} onPress={onReturnPress}>
            Go Back
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default UnsavedChangesModal;
