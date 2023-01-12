import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Trackwyse does not have permission to access your location.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      setLoading(false);
    })();
  }, []);

  return { location, loading };
};

export default useLocation;
