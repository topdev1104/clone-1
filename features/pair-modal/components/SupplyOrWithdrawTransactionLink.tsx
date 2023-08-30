import { TransactionLink } from "@roe-monorepo/shared-features/src/web3/components/TransactionLink";

import { usePairModalState } from "../hooks/usePairModalState";
import { usePairModalTransactions } from "../hooks/usePairModalTransactions";

export const SupplyOrWithdrawTransactionLink = () => {
  const { pairData } = usePairModalState();
  const { lendingPoolTransaction, zapSupplyTransaction } =
    usePairModalTransactions();

  const transactionHash =
    lendingPoolTransaction.transactionHash ??
    zapSupplyTransaction.transactionHash;

  const chainId = pairData?.chainId;

  return (
    <TransactionLink chainId={chainId} transactionHash={transactionHash} />
  );
};
