import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "../lib/tailwind";
import Label from "../components/Label";
import { useAuth } from "../contexts/Auth";
import { useLabels } from "../contexts/Labels";
import HomeLoader from "../components/Loaders/Home";

interface HomeProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { loading, labels, getLabels } = useLabels();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getLabels();
    setRefreshing(false);
  };

  if (loading && !refreshing) return <HomeLoader />;

  return (
    <SafeAreaView>
      <View style={tw`items-center`}>
        <View style={tw`w-11/12`}>
          <Text style={tw`font-bold text-3xl`}>
            Welcome {user?.firstName || ""}
          </Text>
        </View>
      </View>

      <FlatList
        numColumns={2}
        style={tw`mx-3 my-5 h-full`}
        data={labels.length > 0 ? labels.slice(1) : labels}
        ListHeaderComponent={
          <ListHeader navigation={navigation} firstLabel={labels[0]} />
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={tw`flex-1 justify-between`}
        renderItem={({ item: label }) => <Label label={label} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
          <View style={tw`bg-primary-200 rounded-full p-8`}>
            <View style={tw`absolute inset-0  items-center justify-center`}>
              <Ionicons name="add" size={32} color="white" />
            </View>
          </View>
          <Text style={tw`font-medium text-lg mt-3`}>Add Label</Text>
          <Text style={tw`text-gray-400 text-sm text-center`}>
            Add and customize your tracking labels
          </Text>
        </TouchableOpacity>
      </View>

      {firstLabel && <Label label={firstLabel} />}
    </View>
  );
};

export default Home;
