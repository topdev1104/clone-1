import { TransactionLink } from "@roe-monorepo/shared-features/src/web3/components/TransactionLink";

import { useZapContentState } from "../hooks/useZapContentState";
import { useZapContentTransactions } from "../hooks/useZapContentTransactions";

export const ZapTransactionLink = () => {
  const { pairData } = useZapContentState();

  const { supplyTransaction } = useZapContentTransactions();
  const { transactionHash } = supplyTransaction;

  const chainId = pairData?.chainId;

  return (
    <TransactionLink chainId={chainId} transactionHash={transactionHash} />
  );
};
