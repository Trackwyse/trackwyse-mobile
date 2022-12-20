import { View, Text } from "react-native";
import tw from "@/lib/tailwind";

interface PermissionsProps {
  title?: string;
  description?: string;
}

const Permissions: React.FC<PermissionsProps> = ({ title, description }) => {
  return (
    <View style={tw`flex items-center`}>
      <View style={tw`w-11/12 pt-10`}>
        <Text style={tw`text-2xl font-bold`}>{title}</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>{description}</Text>
      </View>
    </View>
  );
};

export default Permissions;
