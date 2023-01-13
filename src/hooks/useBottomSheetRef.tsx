/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useBottomSheetRef = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return {
    bottomSheetRef,
    open,
    close,
  };
};

export default useBottomSheetRef;
