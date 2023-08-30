import type Big from "big.js";

export const getFormattedTokenPrice = (
  reserve0: Big | undefined,
  reserve1: Big | undefined
) => {
  if (reserve0 && reserve1) {
    const token0Price = reserve0.div(reserve1);

    return token0Price.round(6).toString();
  }

  return "-";
};
