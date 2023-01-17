/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import ExpoConstants from "expo-constants";

import { stringifyVersion } from "@/lib/textUtil";

const AppConstants = {
  version: ExpoConstants.manifest?.version,
  versionInt: stringifyVersion(ExpoConstants.manifest?.version || "0.0.0"),
};

export const TransactionStatusMessages = {
  UNCONFIRMED: {
    message: "Unconfirmed",
    chipType: "warning",
  },
  UNFULFILLED: {
    message: "Processing",
    chipType: "warning",
  },
  PARTIALLY_FULFILLED: {
    message: "Processing",
    chipType: "warning",
  },
  PARTIALLY_RETURNED: {
    message: "Processing",
    chipType: "warning",
  },
  RETURNED: {
    message: "Returned",
    chipType: "error",
  },
  FULFILLED: {
    message: "Completed",
    chipType: "success",
  },
  CANCELED: {
    message: "Canceled",
    chipType: "error",
  },
};

export default AppConstants;
