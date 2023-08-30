import { useBaseTransaction } from "@roe-monorepo/shared-features/src/transactions/hooks/useBaseTransaction";
import { useWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useWallet";
import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IAaveLendingPool__factory as LendingPoolFactory } from "../../smart-contracts/types";

import type {
  DependantQueries,
  OnTransactionSuccess,
} from "@roe-monorepo/shared-features/src/transactions/types/BaseTransaction";

export const useLendingPoolSupplyTransaction = (
  lendingPoolAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess
) => {
  const { account = "" } = useWallet();

  const lendingPoolContract = LendingPoolFactory.connect(
    lendingPoolAddress,
    getDefaultProvider()
  );
  const method = "deposit";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    lendingPoolContract,
    method,
    dependantQueries,
    onTransactionSuccess
  );

  const runTransaction = useCallback(
    (tokenAddress: string, amount: string) => {
      mutation.mutate([tokenAddress, amount, account, 0]);
    },
    [mutation, account]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
