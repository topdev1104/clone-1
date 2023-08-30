import { toBig } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { getTokenAmountWithSlippage } from "@roe-monorepo/shared-features/src/transactions/helpers/getTokenAmountWithSlippage";
import { useBaseTransaction } from "@roe-monorepo/shared-features/src/transactions/hooks/useBaseTransaction";
import { useWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useWallet";
import { constants, getDefaultProvider } from "ethers";
import { useCallback } from "react";

import { IZapBox__factory as ZapBoxFactory } from "../../smart-contracts/types";

import type {
  DependantQueries,
  OnTransactionSuccess,
} from "@roe-monorepo/shared-features/src/transactions/types/BaseTransaction";

export const useZapSingleSupplyNativeCoinTransaction = (
  zapBoxAddress: string,
  dependantQueries?: DependantQueries,
  onTransactionSuccess?: OnTransactionSuccess
) => {
  const { provider } = useWallet();
  const signer = provider?.getSigner();

  const zapBoxContract = ZapBoxFactory.connect(
    zapBoxAddress,
    signer ?? getDefaultProvider()
  );

  const method = "zapInSingleAssetETH";

  const { mutation, resetTransaction, transactionHash } = useBaseTransaction(
    zapBoxContract,
    method,
    dependantQueries,
    onTransactionSuccess
  );

  const runTransaction = useCallback(
    async (
      lendingPoolAddress: string,
      routerAddress: string,

      // only for the same interface with useZapSingleSupplyTransaction
      nativeCoinAddress: string,
      nativeCoinAmount: string,
      token1Address: string
    ) => {
      const { amountToken } = await zapBoxContract.callStatic[method](
        lendingPoolAddress,
        routerAddress,
        token1Address,
        constants.Zero,
        { value: nativeCoinAmount }
      );

      const token1Amount = getTokenAmountWithSlippage(
        toBig(amountToken)
      ).toString();

      mutation.mutate([
        lendingPoolAddress,
        routerAddress,
        token1Address,
        token1Amount,
        { value: nativeCoinAmount },
      ]);
    },
    [mutation, zapBoxContract]
  );

  return {
    mutation,
    resetTransaction,
    transactionHash,
    runTransaction,
  };
};
