import { View, Text } from "react-native";
import Input from "../components/Input";
import tw from "../lib/tailwind";

interface EditLabelScreenProps {
  route: any;
}

const EditLabel: React.FC<EditLabelScreenProps> = ({ route }) => {
  const { labelId } = route.params;

  return (
    <View style={tw`flex items-center`}>
      <View style={tw`w-11/12 pt-10`}>
        <Text style={tw`text-2xl font-bold`}>Edit Label</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          Update details about your label in order to have the best chance of finding a lost item.
        </Text>
      </View>

      <Input placeholder="Tracker Name" size="lg" style={tw`my-1`} />
      <Input placeholder="Phone Number" size="lg" style={tw`my-1`} keyboardType="numeric" />
    </View>
  );
};

export default EditLabel;
