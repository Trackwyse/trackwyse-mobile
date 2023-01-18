import { useState } from "react";

const useRefreshControl = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async (fn: () => Promise<any>) => {
    setRefreshing(true);
    await fn();
    setRefreshing(false);
  };

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefreshControl;
