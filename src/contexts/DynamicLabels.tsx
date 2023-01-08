/*
  * This file is named in an odd way as a temporary solution.

  * This file serves the following purposes:
  * - Allows logged in and logged out users to store which label ID they have found
  * - Allows multiple screens to access the found label ID, without having to pass it through props
*/
import { useReducer, useContext, createContext } from "react";

interface DynamicLabelsContextData {
  foundLabel: Label;
  setFoundLabel: (label: Label) => void;
}

const DynamicLabelsContext = createContext<DynamicLabelsContextData>(
  {} as DynamicLabelsContextData
);

type DynamicLabelsAction = { type: "SET_FOUND_LABEL"; payload: Label };

const dynamicLabelsReducer = (state: Label, action: DynamicLabelsAction) => {
  switch (action.type) {
    case "SET_FOUND_LABEL":
      return action.payload;
    default:
      return state;
  }
};

const DynamicLabelsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [foundLabel, dispatch] = useReducer(dynamicLabelsReducer, {} as Label);

  const setFoundLabel = (label: Label) => {
    dispatch({ type: "SET_FOUND_LABEL", payload: label });
  };

  return (
    <DynamicLabelsContext.Provider value={{ foundLabel, setFoundLabel }}>
      {children}
    </DynamicLabelsContext.Provider>
  );
};

const useDynamicLabels = () => useContext(DynamicLabelsContext);

export { DynamicLabelsProvider, useDynamicLabels };
