import { getPairTotalAPY } from "../../pair/helpers/getPairApy";

import type { PairRow } from "../types/PairRow";

export const getRowBalance = (row: PairRow) => {
  const { pairTokenPrice, walletAToken } = row;

  return walletAToken?.balance?.mul(pairTokenPrice).toNumber() ?? null;
};

export const getSumBalance = (rows: PairRow[]) => {
  const firstBalance = getRowBalance(rows[0]);

  if (firstBalance === null) {
    return null;
  }

  return rows.reduce((accumulator, row) => {
    const balance = getRowBalance(row);

    return balance !== null ? accumulator + balance : 0;
  }, 0);
};

export const getSumBalanceByAPY = (rows: PairRow[]) => {
  const firstBalance = getRowBalance(rows[0]);

  if (firstBalance === null) {
    return null;
  }

  return rows.reduce((accumulator, row) => {
    const balance = getRowBalance(row);
    const APY = getPairTotalAPY(row);

    return balance !== null ? accumulator + balance * APY : 0;
  }, 0);
};

export const getSumTVL = (rows: PairRow[]) =>
  rows.reduce(
    (accumulator, { totalSupplied }) => accumulator + totalSupplied,
    0
  );

export const getAverageAPY = (
  sumBalanceByAPY: ReturnType<typeof getSumBalanceByAPY>,
  sumBalance: ReturnType<typeof getSumBalance>
) => {
  if (sumBalanceByAPY === null || sumBalance === null) {
    return null;
  }

  if (sumBalance === 0) {
    return 0;
  }

  return sumBalanceByAPY / sumBalance;
};
