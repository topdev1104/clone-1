import {
  getSumBalance,
  getSumBalanceByAPY,
  getSumTVL,
  getAverageAPY,
} from "../helpers/pairsMetrics";

import { usePairsTableRows } from "./usePairsTableRows";

import type { PairRow } from "../types/PairRow";

export const usePairsMetrics = () => {
  const rows = usePairsTableRows();

  const isLoading = rows.some(
    (row) => !row || !row.walletPairToken || !row.walletAToken
  );

  if (isLoading) {
    return {
      sumBalance: undefined,
      sumTVL: undefined,
      averageAPY: undefined,
    };
  }

  const loadedRows = rows as PairRow[];

  const sumBalance = getSumBalance(loadedRows);
  const sumTVL = getSumTVL(loadedRows);

  const sumBalanceByAPY = getSumBalanceByAPY(loadedRows);
  const averageAPY = getAverageAPY(sumBalanceByAPY, sumBalance);

  return { sumBalance, sumTVL, averageAPY };
};
