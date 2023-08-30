import { TransactionErrorMainButton } from "@roe-monorepo/shared-features/src/modal/components/TransactionErrorMainButton";
import { BigButton } from "@roe-monorepo/shared-features/src/shared/components/BigButton";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { BigButtonColor } from "@roe-monorepo/shared-features/src/shared/types/bigButtonProps";
import { useCallback } from "react";

import { toTokenAmount } from "../helpers/tokenAmount";
import { useSourceTokenState } from "../hooks/tokenState";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { usePairModalState } from "../hooks/usePairModalState";
import { usePairModalTransactions } from "../hooks/usePairModalTransactions";
import { TabType } from "../types/TabType";

export const SupplyOrWithdrawMainButton = () => {
  const { tabType } = usePairModalState();
  const { pairQuery, pairTokenQuery, aTokenQuery } = usePairModalQueries();
  const { lendingPoolTransaction } = usePairModalTransactions();

  const { tokenData, inputValueBig } = useSourceTokenState();

  const { mutation, resetTransaction, runTransaction } = lendingPoolTransaction;
  const dependantQueries = [pairQuery, pairTokenQuery, aTokenQuery];

  const [buttonTitle, loadingButtonTitle] =
    tabType === TabType.SUPPLY
      ? ["Supply", "Supplying..."]
      : ["Withdraw", "Withdrawing..."];

  const handleButtonClick = useCallback(() => {
    const pairAddress = pairTokenQuery.data?.address;

    if (tokenData && pairAddress) {
      const amount = toTokenAmount(inputValueBig, tokenData).toString();

      runTransaction(pairAddress, amount);
    }
  }, [pairTokenQuery, tokenData, inputValueBig, runTransaction]);

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
