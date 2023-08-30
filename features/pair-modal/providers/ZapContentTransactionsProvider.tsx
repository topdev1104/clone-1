import { isNativeCoinAddress } from "@roe-monorepo/shared-features/src/queries/helpers/nativeCoin";
import { defaultUseMutationResult } from "@roe-monorepo/shared-features/src/transactions/constants/defaultUseMutationResult";
import { useTokenApproveTransaction } from "@roe-monorepo/shared-features/src/transactions/hooks/useTokenApproveTransaction";
import { createContext, useMemo } from "react";

import { useZapSupplyNativeCoinTransaction } from "../../transactions/hooks/useZapSupplyNativeCoinTransaction";
import { useZapSupplyTransaction } from "../../transactions/hooks/useZapSupplyTransaction";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { useZapContentState } from "../hooks/useZapContentState";

import type { ZapContentContextTransactions } from "../types/ZapContentContextTransactions";
import type { FC, ReactNode } from "react";

interface ZapContentTransactionsProviderProps {
  children: ReactNode;
}

export const ZapContentTransactionsContext =
  createContext<ZapContentContextTransactions>({
    token0ApproveTransaction: defaultUseMutationResult,
    token1ApproveTransaction: defaultUseMutationResult,
    supplyTransaction: defaultUseMutationResult,
  });

export const ZapContentTransactionsProvider: FC<
  ZapContentTransactionsProviderProps
> = ({ children }) => {
  const { token0State, token1State, addresses } = useZapContentState();

  const { pairQuery, nativeCoinQuery, token0Query, token1Query } =
    useZapContentQueries();
  const { aTokenQuery } = usePairModalQueries();

  const dependantQueries = [
    pairQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
    aTokenQuery,
  ];
  const onTransactionSuccess = () => {
    token0State.setInputValue("");
    token1State.setInputValue("");
  };

  const { zapBoxAddress } = addresses;

  const token0Address = token0State.tokenData?.address ?? "";
  const token1Address = token1State.tokenData?.address ?? "";

  const isUseNativeCoin =
    isNativeCoinAddress(token0Address) || isNativeCoinAddress(token1Address);

  const token0ApproveTransaction = useTokenApproveTransaction(
    token0Address,
    dependantQueries
  );

  const token1ApproveTransaction = useTokenApproveTransaction(
    token1Address,
    dependantQueries
  );

  const zapSupplyTransaction = useZapSupplyTransaction(
    zapBoxAddress,
    dependantQueries,
    onTransactionSuccess
  );

  const zapSupplyNativeCoinTransaction = useZapSupplyNativeCoinTransaction(
    zapBoxAddress,
    dependantQueries,
    onTransactionSuccess
  );

  const supplyTransaction = isUseNativeCoin
    ? zapSupplyNativeCoinTransaction
    : zapSupplyTransaction;

  const value = useMemo(
    () => ({
      token0ApproveTransaction,
      token1ApproveTransaction,
      supplyTransaction,
    }),
    [token0ApproveTransaction, token1ApproveTransaction, supplyTransaction]
  );

  return (
    <ZapContentTransactionsContext.Provider value={value}>
      {children}
    </ZapContentTransactionsContext.Provider>
  );
};
