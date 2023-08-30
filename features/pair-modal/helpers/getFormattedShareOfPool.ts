import { getExp } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { getFormattedAPY } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";
import Big from "big.js";

export const getFormattedShareOfPool = (
  tokenInputValueBig: Big,
  reserve: Big | undefined
) => {
  if (reserve) {
    const shareOfPool = tokenInputValueBig.div(tokenInputValueBig.add(reserve));

    // <0.01%
    const minValue = getExp(-4);

    // 100%
    const maxValue = new Big(1);

    if (shareOfPool.lt(minValue)) {
      const formattedShareOfPool = getFormattedAPY(minValue.toNumber());
      return `<${formattedShareOfPool}`;
    }

    if (shareOfPool.gt(maxValue)) {
      // return 100%
      return getFormattedAPY(maxValue.toNumber());
    }

    return getFormattedAPY(shareOfPool.toNumber());
  }

  return "-";
};
