import { TransactionErrorMainButton } from "@roe-monorepo/shared-features/src/modal/components/TransactionErrorMainButton";
import { BigButton } from "@roe-monorepo/shared-features/src/shared/components/BigButton";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { BigButtonColor } from "@roe-monorepo/shared-features/src/shared/types/bigButtonProps";
import { useCallback } from "react";

import { getZapSupplyTransactionParameters } from "../helpers/zapTransactionParameters";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { useZapContentState } from "../hooks/useZapContentState";
import { useZapContentTransactions } from "../hooks/useZapContentTransactions";

export const ZapSupplyMainButton = () => {
  const { pairData, token0State, token1State, addresses } =
    useZapContentState();

  const { pairQuery, nativeCoinQuery, token0Query, token1Query } =
    useZapContentQueries();
  const { aTokenQuery } = usePairModalQueries();

  const { supplyTransaction } = useZapContentTransactions();

  const { mutation, resetTransaction, runTransaction } = supplyTransaction;
  const dependantQueries = [
    pairQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
    aTokenQuery,
  ];

  const { tokenData: token0Data, inputValueBig: token0InputValueBig } =
    token0State;
  const { tokenData: token1Data, inputValueBig: token1InputValueBig } =
    token1State;

  const handleButtonClick = useCallback(() => {
    if (pairData && token0Data && token1Data) {
      const { lendingPoolAddress } = pairData;
      const { routerAddress } = addresses;

      const { token0Address, token0Amount, token1Address, token1Amount } =
        getZapSupplyTransactionParameters(
          token0Data,
          token0InputValueBig,
          token1Data,
          token1InputValueBig
        );

      runTransaction(
        lendingPoolAddress,
        routerAddress,
        token0Address,
        token0Amount,
        token1Address,
        token1Amount
      );
    }
  }, [
    pairData,
    addresses,
    token0Data,
    token1Data,
    token0InputValueBig,
    token1InputValueBig,
    runTransaction,
  ]);

  const { isError, isLoading } = mutation;

  const isZeroBalance =
    token0InputValueBig.lte(getZero()) || token1InputValueBig.lte(getZero());

  const isButtonDisabled =
    isZeroBalance || dependantQueries.some((query) => query.isLoading);

  if (isError) {
    return (
      <TransactionErrorMainButton
        mutation={mutation}
        resetTransaction={resetTransaction}
      />
    );
  }

  return (
    <BigButton
      color={BigButtonColor.BRAND}
      disabled={isButtonDisabled}
      isLoading={isLoading}
      onClick={handleButtonClick}
    >
      {isLoading ? "Supplying..." : "Supply"}
    </BigButton>
  );
};
