// /*
//  * Created on Mon Jan 16 2023
//  * Created by JS00001
//  *
//  * Copyright (c) 2023 Trackwyse
//  */
// import React, { useState } from "react";
// import { RefreshControl, ScrollView, View } from "react-native";

// import tw from "@/lib/tailwind";
// import { useAuth } from "@/contexts/Auth";
// import Container from "@/components/Container";
// import TransactionsLoader from "@/components/Loaders/Transactions";

// interface ProfileScreenProps {}

// const Profile: React.FC<ProfileScreenProps> = ({}) => {
//   const { accessToken } = useAuth();
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);

//     setRefreshing(false);
//   };

//   return (
//     <View>
//       <TransactionsLoader />
//     </View>
//   );

//   return (
//     <View>
//       <Container>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={tw`pb-5 h-full`}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         ></ScrollView>
//       </Container>
//     </View>
//   );
// };

// export default Profile;
