import type Big from "big.js";

export const getOppositeTokenAmount = (
  token0InputValueBig: Big,
  reserve0: Big,
  reserve1: Big
) => token0InputValueBig.div(reserve0).mul(reserve1);
