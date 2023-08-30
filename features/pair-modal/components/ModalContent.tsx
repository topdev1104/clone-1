import { usePairModalState } from "../hooks/usePairModalState";
import { useZapContentState } from "../hooks/useZapContentState";
import {
  ModalContainer,
  Separator,
  TabsContainer,
} from "../styles/ModalContent";
import { TabType } from "../types/TabType";
import { ZapType } from "../types/ZapType";

import { DepositTypeSelector } from "./DepositTypeSelector";
import { SupplyOrWithdrawContent } from "./SupplyOrWithdrawContent";
import { TabButton } from "./TabButton";
import { ZapContent } from "./ZapContent";

export const ModalContent = () => {
  const { zapType } = useZapContentState();
  const { tabType } = usePairModalState();

  return (
    <ModalContainer>
      <TabsContainer>
        <TabButton tabType={TabType.SUPPLY} />
        <TabButton tabType={TabType.WITHDRAW} />
      </TabsContainer>
      {tabType === TabType.SUPPLY ? <Separator /> : null}
      {tabType === TabType.SUPPLY ? <DepositTypeSelector /> : null}
      {zapType === ZapType.DUAL ? <ZapContent /> : <SupplyOrWithdrawContent />}
    </ModalContainer>
  );
};
