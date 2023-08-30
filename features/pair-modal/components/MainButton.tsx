import { isInsufficientTokenAllowance } from "@roe-monorepo/shared-features/src/input-card/helpers/tokenBalance";
import { ConnectWalletMainButton } from "@roe-monorepo/shared-features/src/modal/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "@roe-monorepo/shared-features/src/modal/components/SuccessfulMainButton";
import { TokenErrorMainButton } from "@roe-monorepo/shared-features/src/modal/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "@roe-monorepo/shared-features/src/modal/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "@roe-monorepo/shared-features/src/modal/components/ZeroBalanceMainButton";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { useWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useWallet";

import { useSourceTokenState } from "../hooks/tokenState";
import { usePairModalState } from "../hooks/usePairModalState";
import { usePairModalTransactions } from "../hooks/usePairModalTransactions";
import { useZapContentState } from "../hooks/useZapContentState";
import { TabType } from "../types/TabType";

import { ApproveMainButton } from "./ApproveMainButton";
import { SupplyOrWithdrawMainButton } from "./SupplyOrWithdrawMainButton";
import { ZapSingleSupplyMainButton } from "./ZapSingleSupplyMainButton";

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export const MainButton = () => {
  const { isConnected, chainId } = useWallet();

  const { tabType, pairData } = usePairModalState();
  const { isUseZapTransactionForToken } = useZapContentState();

  const { lendingPoolTransaction, zapSupplyTransaction } =
    usePairModalTransactions();

  const { tokenData, inputValueBig, isError, error } = useSourceTokenState();

  const { isSuccess } = isUseZapTransactionForToken(tokenData)
    ? zapSupplyTransaction.mutation
    : lendingPoolTransaction.mutation;

  const isZeroBalance = inputValueBig.lte(getZero());
  const isInsufficientAllowance = isInsufficientTokenAllowance(
    inputValueBig,
    tokenData
  );

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (pairData && chainId && pairData.chainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    const title =
      tabType === TabType.SUPPLY ? "Supply Successful" : "Withdraw Successful";

    return <SuccessfulMainButton title={title} />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isError) {
    return <TokenErrorMainButton error={error} tokenData={tokenData} />;
  }

  if (isInsufficientAllowance) {
    return <ApproveMainButton />;
  }

  if (isUseZapTransactionForToken(tokenData)) {
    return <ZapSingleSupplyMainButton />;
  }

  return <SupplyOrWithdrawMainButton />;
};
