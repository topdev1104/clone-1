import type { TokenData } from "@roe-monorepo/shared-features/src/queries/types/Token";
import type Big from "big.js";

export const getFormattedLpTokenAmount = (
  tokenInputValueBig: Big,
  reserve: Big | undefined,
  pairTokenData: TokenData
) => {
  if (reserve && pairTokenData) {
    const pairTokenTotalSupply = pairTokenData.totalSupply;

    const lpTokenAmount = tokenInputValueBig
      .div(reserve)
      .mul(pairTokenTotalSupply);

    return lpTokenAmount.round(10).toString();
  }

  return "-";
};
