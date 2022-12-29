import ExpoConstants from "expo-constants";
import { stringifyVersion } from "./textUtil";

const Constants = {
  version: ExpoConstants.manifest?.version,
  versionInt: stringifyVersion(ExpoConstants.manifest?.version || "0.0.0"),
};

export default Constants;
