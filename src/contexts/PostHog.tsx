import { PostHogProvider as PHogProvider } from "posthog-react-native";

import AppConstants from "@/lib/constants";

const PostHogProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <PHogProvider
      apiKey={AppConstants.posthogPublicKey}
      options={{
        host: "https://app.posthog.com",
      }}
    >
      {children}
    </PHogProvider>
  );
};

export default PostHogProvider;
