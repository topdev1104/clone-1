import { useCallback } from "react";

import { tabButtonTitles } from "../constants/tabButtonTitles";
import { usePairModalState } from "../hooks/usePairModalState";
import { useZapContentState } from "../hooks/useZapContentState";
import { Button } from "../styles/TabButton";
import { TabType } from "../types/TabType";
import { ZapType } from "../types/ZapType";

import type { FC } from "react";

interface TabButtonProps {
  tabType: TabType;
}

export const TabButton: FC<TabButtonProps> = ({ tabType }) => {
  const {
    tabType: currentTabType,
    setTabType,
    supplyTokenState,
    withdrawTokenState,
  } = usePairModalState();

  const { setZapType } = useZapContentState();

  const isActive = currentTabType === tabType;

  const handleClick = useCallback(() => {
    setTabType(tabType);
    supplyTokenState.setInputValue("");
    withdrawTokenState.setInputValue("");

    if (tabType === TabType.WITHDRAW) {
      setZapType(null);
    } else {
      setZapType(ZapType.LP);
    }
  }, [setTabType, tabType, supplyTokenState, withdrawTokenState, setZapType]);

  const title = tabButtonTitles[tabType];

  return (
    <Button isActive={isActive} onClick={handleClick}>
      {title}
    </Button>
  );
};
