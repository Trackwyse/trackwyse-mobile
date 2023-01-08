import Modal from "react-native-modal";
import { View, Text } from "react-native";

import tw from "@/lib/tailwind";
import navigation from "@/navigation";
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
          <Text style={tw`text-2xl font-bold`}>Wait!</Text>
          <Text style={tw`my-4 text-gray-400 text-base`}>
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
