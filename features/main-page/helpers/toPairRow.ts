import { getFormattedPairTitle } from "../../pair/helpers/getFormattedPairTitle";
import {
  getTotalSupplied,
  getTotalBorrowed,
} from "../../pair/helpers/pairMetrics";

import type { Pair } from "../../queries/types/Pair";
import type { PairRow } from "../types/PairRow";
import type { TokenData } from "@roe-monorepo/shared-features/src/queries/types/Token";

export const toPairRow = (
  pair: Pair,
  walletPairToken: TokenData,
  walletAToken: TokenData
): PairRow => {
  const {
    id,
    chainId,
    source,
    token0,
    token1,
    swapFeesAPY,
    roeSupplyAPY,
    rewardAPY,
    booster,
    pairTokenPrice,
  } = pair;
  const tokens: PairRow["tokens"] = [token0.symbol, token1.symbol];
  const title = getFormattedPairTitle(pair);

  const totalSupplied = getTotalSupplied(pair);
  const totalBorrowed = getTotalBorrowed(pair);

  return {
    id,
    chainId,
    source,
    tokens,
    title,
    totalSupplied,
    totalBorrowed,
    swapFeesAPY,
    roeSupplyAPY,
    rewardAPY,
    booster,
    pairTokenPrice,
    walletPairToken,
    walletAToken,
  };
};
