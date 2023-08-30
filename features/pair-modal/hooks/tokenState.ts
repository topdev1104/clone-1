import { TabType } from "../types/TabType";

import { usePairModalState } from "./usePairModalState";

export const useSourceTokenState = () => {
  const { tabType, supplyTokenState, withdrawTokenState } = usePairModalState();

  return tabType === TabType.SUPPLY ? supplyTokenState : withdrawTokenState;
};

export const useTargetTokenState = () => {
  const { tabType, supplyTokenState, withdrawTokenState } = usePairModalState();

  return tabType === TabType.SUPPLY ? withdrawTokenState : supplyTokenState;
};
