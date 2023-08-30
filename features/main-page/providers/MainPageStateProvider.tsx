import { createContext, useMemo, useState } from "react";

import type { MainPageContextState } from "../types/MainPageContextState";
import type { FC, ReactNode } from "react";

interface MainPageStateProviderProps {
  children: ReactNode;
}

export const MainPageStateContext = createContext<MainPageContextState>({
  filterInputValue: "",
  setFilterInputValue: () => undefined,
});

export const MainPageStateProvider: FC<MainPageStateProviderProps> = ({
  children,
}) => {
  const [filterInputValue, setFilterInputValue] = useState("");

  const value = useMemo(
    () => ({
      filterInputValue,
      setFilterInputValue,
    }),
    [filterInputValue, setFilterInputValue]
  );

  return (
    <MainPageStateContext.Provider value={value}>
      {children}
    </MainPageStateContext.Provider>
  );
};
