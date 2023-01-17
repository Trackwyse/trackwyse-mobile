import { PostHogProvider as PHogProvider } from "posthog-react-native";

const PostHogProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <PHogProvider
      apiKey="phc_AkDMJVw4fkcAjjGrWRclPzYIfnwEJLvOjQJwg2FxncU"
      options={{
        host: "https://app.posthog.com",
      }}
    >
      {children}
    </PHogProvider>
  );
};

export default PostHogProvider;
