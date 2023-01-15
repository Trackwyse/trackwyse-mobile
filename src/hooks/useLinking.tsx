import * as RNLinking from "expo-linking";

const useLinking = () => {
  const prefix = RNLinking.createURL("/");

  const linking = {
    prefixes: [prefix, "https://trackwyse.com"],
    config: {
      screens: {
        FoundLabelDetails: {
          path: ":id",
          initialRouteName: "Home",
          parse: {
            id: (id: string) => id,
          },
        },
      },
    },
  };

  return linking;
};

export default useLinking;
