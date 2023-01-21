import { useMemo } from "react";
import { getRandomColor } from "@/lib/random";

const useRandomBannerColor = () => {
  const bannerColor = useMemo(() => getRandomColor(), []);

  return bannerColor;
};

export default useRandomBannerColor;
