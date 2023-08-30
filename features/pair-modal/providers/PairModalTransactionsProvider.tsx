import { isNativeCoinAddress } from "@roe-monorepo/shared-features/src/queries/helpers/nativeCoin";
import { defaultUseMutationResult } from "@roe-monorepo/shared-features/src/transactions/constants/defaultUseMutationResult";
import { useTokenApproveTransaction } from "@roe-monorepo/shared-features/src/transactions/hooks/useTokenApproveTransaction";
import { createContext, useMemo } from "react";

import { useLendingPoolSupplyTransaction } from "../../transactions/hooks/useLendingPoolSupplyTransaction";
import { useLendingPoolWithdrawTransaction } from "../../transactions/hooks/useLendingPoolWithdrawTransaction";
import { useZapSingleSupplyNativeCoinTransaction } from "../../transactions/hooks/useZapSingleSupplyNativeCoinTransaction";
import { useZapSingleSupplyTransaction } from "../../transactions/hooks/useZapSingleSupplyTransaction";
import { useSourceTokenState } from "../hooks/tokenState";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { usePairModalState } from "../hooks/usePairModalState";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { useZapContentState } from "../hooks/useZapContentState";
import { TabType } from "../types/TabType";

import type { PairModalContextTransactions } from "../types/PairModalContextTransactions";
import type { FC, ReactNode } from "react";

interface PairModalTransactionsProviderProps {
  children: ReactNode;
}

export const PairModalTransactionsContext =
  createContext<PairModalContextTransactions>({
    tokenApproveTransaction: defaultUseMutationResult,
    lendingPoolTransaction: defaultUseMutationResult,
    zapSupplyTransaction: defaultUseMutationResult,
  });

export const PairModalTransactionsProvider: FC<
  PairModalTransactionsProviderProps
> = ({ children }) => {
  const { tabType, pairData, supplyTokenState, withdrawTokenState } =
    usePairModalState();
  const { addresses } = useZapContentState();

  const { pairQuery, pairTokenQuery, aTokenQuery } = usePairModalQueries();
  const { nativeCoinQuery, token0Query, token1Query } = useZapContentQueries();

  const { tokenData } = useSourceTokenState();

  const lendingPoolAddress = pairData?.lendingPoolAddress ?? "";
  const { zapBoxAddress } = addresses;

  const lendingPoolDependantQueries = [pairQuery, pairTokenQuery, aTokenQuery];
  const zapDependantQueries = lendingPoolDependantQueries.concat(
    nativeCoinQuery,
    token0Query,
    token1Query
  );

  const onTransactionSuccess = () => {
    supplyTokenState.setInputValue("");
    withdrawTokenState.setInputValue("");
  };

  const tokenAddress = tokenData?.address ?? "";
  const isUseNativeCoin = isNativeCoinAddress(tokenAddress);

  const tokenApproveTransaction = useTokenApproveTransaction(
    tokenAddress,
    zapDependantQueries
  );

  const supplyTransaction = useLendingPoolSupplyTransaction(
    lendingPoolAddress,
    lendingPoolDependantQueries,
    onTransactionSuccess
  );

  const withdrawTransaction = useLendingPoolWithdrawTransaction(
    lendingPoolAddress,
    lendingPoolDependantQueries,
    onTransactionSuccess
  );

  const zapSingleSupplyTransaction = useZapSingleSupplyTransaction(
    zapBoxAddress,
    zapDependantQueries,
    onTransactionSuccess
  );

  const zapSingleSupplyNativeCoinTransaction =
    useZapSingleSupplyNativeCoinTransaction(
      zapBoxAddress,
      zapDependantQueries,
      onTransactionSuccess
    );

  const lendingPoolTransaction =
    tabType === TabType.SUPPLY ? supplyTransaction : withdrawTransaction;

  const zapSupplyTransaction = isUseNativeCoin
    ? zapSingleSupplyNativeCoinTransaction
    : zapSingleSupplyTransaction;

  const value = useMemo(
    () => ({
      tokenApproveTransaction,
      lendingPoolTransaction,
      zapSupplyTransaction,
    }),
    [tokenApproveTransaction, lendingPoolTransaction, zapSupplyTransaction]
  );

  return (
    <PairModalTransactionsContext.Provider value={value}>
      {children}
    </PairModalTransactionsContext.Provider>
  );
};
