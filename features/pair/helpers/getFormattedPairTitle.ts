import type { Pair } from "../../queries/types/Pair";

export const getFormattedPairTitle = (pair: Pair) => {
  const { token0, token1 } = pair;

  return `${token0.symbol}-${token1.symbol}`;
};
