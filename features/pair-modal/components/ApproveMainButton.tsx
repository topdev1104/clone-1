import { ApproveMainButton as BaseApproveMainButton } from "@roe-monorepo/shared-features/src/modal/components/ApproveMainButton";

import { useSourceTokenState } from "../hooks/tokenState";
import { usePairModalState } from "../hooks/usePairModalState";
import { usePairModalTransactions } from "../hooks/usePairModalTransactions";
import { useZapContentState } from "../hooks/useZapContentState";

export const ApproveMainButton = () => {
  const { pairData } = usePairModalState();
  const { tokenApproveTransaction } = usePairModalTransactions();

  const { addresses, isUseZapTransactionForToken } = useZapContentState();

  const { tokenData } = useSourceTokenState();

  const lendingPoolAddress = pairData?.lendingPoolAddress ?? "";
  const { zapBoxAddress } = addresses;

  // spenderAddress for zap tokens - zapBoxAddress
  // spenderAddress for lpToken and roeLpToken - lendingPoolAddress
  const spenderAddress = isUseZapTransactionForToken(tokenData)
    ? zapBoxAddress
    : lendingPoolAddress;

  return (
    <BaseApproveMainButton
      spenderAddress={spenderAddress}
      tokenApproveTransaction={tokenApproveTransaction}
      tokenData={tokenData}
    />
  );
};
