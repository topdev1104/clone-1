import { getPairConfig } from "@roe-monorepo/shared-features/src/pair/helpers/getPairConfig";

import type { Pair } from "../../queries/types/Pair";
import type { TokenQueryParameters } from "@roe-monorepo/shared-features/src/queries/types/TokenQueryParameters";
import type { UseQueryResult } from "react-query";

export const toPairTokenQueryParameters = (
  pairId: string,
  pairQuery: UseQueryResult<Pair>
): TokenQueryParameters => {
  const { chainId, pairAddress } = getPairConfig(pairId);

  const lendingPoolAddress = pairQuery.data?.lendingPoolAddress;

  return {
    chainId,
    tokenAddress: pairAddress,
    spenderAddress: lendingPoolAddress,
  };
};
