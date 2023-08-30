import { useBaseTransaction } from "@roe-monorepo/shared-features/src/transactions/hooks/useBaseTransaction";
import { getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IZapBox__factory as ZapBoxFactory } from "../../smart-contracts/types";

import type {
  DependantQueries,
  OnTransactionSuccess,
} from "@roe-monorepo/shared-features/src/transactions/types/BaseTransaction";

export const useZapSupplyNativeCoinTransaction = (
  zapBoxAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess
) => {
  const zapBoxContract = ZapBoxFactory.connect(
    zapBoxAddress,
    getDefaultProvider()
  );

  const method = "zapInETH";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    zapBoxContract,
    method,
    dependantQueries,
    onTransactionSuccess
  );

  const runTransaction = useCallback(
    (
      lendingPoolAddress: string,
      routerAddress: string,
      token0Address: string,
      token0Amount: string,

      // only for the same interface with useZapSupplyTransaction
      nativeCoinAddress: string,
      nativeCoinAmount: string
    ) => {
      mutation.mutate([
        lendingPoolAddress,
        routerAddress,
        token0Address,
        token0Amount,
        { value: nativeCoinAmount },
      ]);
    },
    [mutation]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
