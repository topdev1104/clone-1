import { TransactionErrorMainButton } from "@roe-monorepo/shared-features/src/modal/components/TransactionErrorMainButton";
import { BigButton } from "@roe-monorepo/shared-features/src/shared/components/BigButton";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { BigButtonColor } from "@roe-monorepo/shared-features/src/shared/types/bigButtonProps";
import { useCallback } from "react";

import { toTokenAmount } from "../helpers/tokenAmount";
import { getZapSingleSupplyTransactionParameters } from "../helpers/zapTransactionParameters";
import { useSourceTokenState } from "../hooks/tokenState";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { usePairModalTransactions } from "../hooks/usePairModalTransactions";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { useZapContentState } from "../hooks/useZapContentState";

export const ZapSingleSupplyMainButton = () => {
  const { pairData, addresses } = useZapContentState();
  const { pairQuery, pairTokenQuery, aTokenQuery } = usePairModalQueries();
  const { nativeCoinQuery, token0Query, token1Query } = useZapContentQueries();
  const { zapSupplyTransaction } = usePairModalTransactions();

  const { tokenData, inputValueBig } = useSourceTokenState();

  const token0Data = token0Query.data;
  const token1Data = token1Query.data;

  const { mutation, resetTransaction, runTransaction } = zapSupplyTransaction;

  const dependantQueries = [
    pairQuery,
    pairTokenQuery,
    aTokenQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
  ];

  const [buttonTitle, loadingButtonTitle] = ["Supply", "Supplying..."];

  const handleButtonClick = useCallback(() => {
    if (pairData && tokenData && token0Data && token1Data) {
      const { chainId } = pairData;

      const { lendingPoolAddress } = pairData;
      const { routerAddress } = addresses;

      const token0Address = tokenData.address;
      const token0Amount = toTokenAmount(inputValueBig, tokenData).toString();

      const { token1Address } = getZapSingleSupplyTransactionParameters(
        tokenData,
        token0Data,
        token1Data,
        chainId
      );

      void runTransaction(
        lendingPoolAddress,
        routerAddress,
        token0Address,
        token0Amount,
        token1Address
      );
    }
  }, [
    pairData,
    tokenData,
    token0Data,
    token1Data,
    addresses,
    inputValueBig,
    runTransaction,
  ]);

  const { isError, isLoading } = mutation;
  const isButtonDisabled =
    inputValueBig.lte(getZero()) ||
    dependantQueries.some((query) => query.isLoading);

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
      {isLoading ? loadingButtonTitle : buttonTitle}
    </BigButton>
  );
};
