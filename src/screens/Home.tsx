import { Text, ScrollView, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HomeProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        style={tw`mx-3 my-5`}
        data={[]}
        numColumns={2}
        ListHeaderComponent={<ListHeader navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={tw`flex-1 justify-between`}
        renderItem={({ item }) => <View></View>}
      />
    </SafeAreaView>
  );
};

interface ListHeaderProps {
  navigation: NativeStackNavigationProp<any>;
}

const ListHeader: React.FC<ListHeaderProps> = ({ navigation }) => {
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

      {/* <View style={tw`max-w-1/2 flex-1 p-1`}>
        <TouchableOpacity style={tw`py-12 border  border-gray-100 rounded-lg items-center`}>
          <View style={tw`bg-blue-200 rounded-full p-4`}>
            <Ionicons name="ios-locate-outline" size={32} color="white" />
          </View>
          <Text style={tw`font-medium text-lg mt-3`}>Jacks Bike</Text>
          <Text style={tw`text-gray-400 text-sm text-center`}>Click to view more information</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

// const TestItem = ({ item }) => {
//   return (
//     <View style={tw`max-w-1/2 flex-1 p-1`}>
//       <TouchableOpacity style={tw`py-12 border  border-gray-100 rounded-lg items-center`}>
//         <View style={tw`bg-blue-200 rounded-full p-4`}>
//           <Ionicons name="ios-locate-outline" size={32} color="white" />
//         </View>
//         <Text style={tw`font-medium text-lg mt-3`}>Jacks Bike</Text>
//         <Text style={tw`text-gray-400 text-sm text-center`}>Click to view more information</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

export default Home;
