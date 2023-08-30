import { getExp } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import Big from "big.js";

import type { Token } from "@roe-monorepo/shared-features/src/queries/types/Token";

export const toTokenAmount = (value: Big, tokenData: Token) => {
  const multiplier = getExp(tokenData.decimals);

  return value.mul(multiplier).round(0, Big.roundDown);
};

export const fromTokenAmount = (value: Big, tokenData: Token) => {
  const divisor = getExp(tokenData.decimals);

  return value.div(divisor).round(6);
};
