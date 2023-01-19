/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

/*
  * This file is named in an odd way as a temporary solution.

  * This file serves the following purposes:
  * - Manage OWNED labels by logged in users
*/

import { createContext, useReducer, useContext, useState, useEffect } from "react";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";

interface LabelsContextData {
  labels: Label[];
  loading: boolean;
  getLabels: () => Promise<void>;
  createLabel: (label: Label) => void;
  updateLabel: (label: Label) => void;
  deleteLabel: (label: Label) => void;
}

const LabelsContext = createContext<LabelsContextData>({} as LabelsContextData);

type LabelsAction =
  | { type: "GET_LABELS"; payload: Label[] }
  | { type: "CREATE_LABEL"; payload: Label }
  | { type: "UPDATE_LABEL"; payload: Label }
  | { type: "DELETE_LABEL"; payload: Label };

const labelsReducer = (state: Label[], action: LabelsAction) => {
  switch (action.type) {
    case "GET_LABELS":
      return action.payload;
    case "CREATE_LABEL":
      return [...state, action.payload];
    case "UPDATE_LABEL":
      return state.map((label) => {
        if (label.uniqueID === action.payload.uniqueID) {
          return action.payload;
        }
        return label;
      });
    case "DELETE_LABEL":
      return state.filter((label) => label.uniqueID !== action.payload.uniqueID);
    default:
      return state;
  }
};

const LabelsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth();
  const [labels, dispatch] = useReducer(labelsReducer, []);
  const [loading, setLoading] = useState<boolean>(true);

  const getLabels = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getLabels(accessToken);
      dispatch({ type: "GET_LABELS", payload: response.data.labels });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const createLabel = async (label: Label) => {
    setLoading(true);
    try {
      dispatch({
        type: "CREATE_LABEL",
        payload: label,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updateLabel = async (label: Label) => {
    setLoading(true);
    try {
      dispatch({ type: "UPDATE_LABEL", payload: label });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteLabel = async (label: Label) => {
    setLoading(true);
    try {
      dispatch({ type: "DELETE_LABEL", payload: label });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLabels();
  }, []);

  return (
    <LabelsContext.Provider
      value={{
        labels,
        loading,
        getLabels,
        createLabel,
        updateLabel,
        deleteLabel,
      }}
    >
      {children}
    </LabelsContext.Provider>
  );
};

const useLabels = () => useContext(LabelsContext);

export { LabelsProvider, useLabels };
