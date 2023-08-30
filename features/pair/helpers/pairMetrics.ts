import type { Pair } from "../../queries/types/Pair";

export const getTotalSupplied = (pair: Pair) => {
  const { aToken, pairTokenPrice } = pair;

  return aToken.totalSupply.mul(pairTokenPrice).toNumber();
};

export const getTotalBorrowed = (pair: Pair) => {
  const { debtToken, pairTokenPrice } = pair;

  return debtToken.totalSupply.mul(pairTokenPrice).toNumber();
};
