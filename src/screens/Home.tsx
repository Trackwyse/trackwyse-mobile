import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import tw from "../lib/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLabels } from "../contexts/Labels";

interface HomeProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { loading, labels } = useLabels();

  if (loading) return <></>; // TODO: Add loading screen

  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        style={tw`mx-3 my-5`}
        data={labels.length > 0 ? labels.slice(1) : labels}
        ListHeaderComponent={
          <ListHeader navigation={navigation} firstLabel={labels[0]} />
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={tw`flex-1 justify-between`}
        renderItem={({ item }) => (
          <TestItem label={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

interface ListHeaderProps {
  firstLabel: Label | undefined;
  navigation: NativeStackNavigationProp<any>;
}

const ListHeader: React.FC<ListHeaderProps> = ({ navigation, firstLabel }) => {
  return (
    <View style={tw`flex-2 flex-row justify-between`}>
      <View style={tw`max-w-1/2 flex-1 p-1`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("addLabel")}
          style={tw`py-12 border border-dashed border-gray-200 rounded-lg items-center`}
        >
          <View style={tw`bg-primary-200 rounded-full p-4`}>
            <Ionicons name="add" size={32} color="white" />
          </View>
          <Text style={tw`font-medium text-lg mt-3`}>Add Label</Text>
          <Text style={tw`text-gray-400 text-sm text-center`}>
            Add and customize your tracking labels
          </Text>
        </TouchableOpacity>
      </View>

      {firstLabel && (
        <View style={tw`max-w-1/2 flex-1 p-1`}>
          <TouchableOpacity
            style={tw`py-12 border  border-gray-100 rounded-lg items-center`}
            onPress={() =>
              navigation.navigate("editLabel", { labelId: firstLabel._id })
            }
          >
            <View style={tw`bg-blue-200 rounded-full p-4`}>
              <Ionicons name="ios-locate-outline" size={32} color="white" />
            </View>
            <Text style={tw`font-medium text-lg mt-3`}>
              {firstLabel.name ? firstLabel.name : "No Name"}
            </Text>
            <Text style={tw`text-gray-400 text-sm text-center`}>
              Click to view more information
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const TestItem = ({
  navigation,
  label,
}: {
  navigation: NativeStackNavigationProp<any>;
  label: Label;
}) => {
  return (
    <View style={tw`max-w-1/2 flex-1 p-1`}>
      <TouchableOpacity
        style={tw`py-12 border  border-gray-100 rounded-lg items-center`}
        onPress={() => navigation.navigate("editLabel", { labelId: label._id })}
      >
        <View style={tw`bg-blue-200 rounded-full p-4`}>
          <Ionicons name="ios-locate-outline" size={32} color="white" />
        </View>
        <Text style={tw`font-medium text-lg mt-3`}>
          {label.name ? label.name : "No Name"}
        </Text>
        <Text style={tw`text-gray-400 text-sm text-center`}>
          Click to view more information
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
