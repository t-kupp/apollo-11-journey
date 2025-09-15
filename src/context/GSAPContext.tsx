import { createContext, useContext } from "react";

interface GSAPContextValues {
  masterTl: GSAPTimeline | null;
  isReady: boolean;
}

export const GSAPContext = createContext<GSAPContextValues | undefined>(undefined);

export const useGSAPContext = () => {
  const context = useContext(GSAPContext);
  if (context === undefined) {
    throw new Error("useGSAPContext must be used within a GSAPProvider");
  }
  return context;
};
