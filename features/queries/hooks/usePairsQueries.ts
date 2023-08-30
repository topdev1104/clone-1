import { getPairConfig } from "@roe-monorepo/shared-features/src/pair/helpers/getPairConfig";
import { useQueries } from "react-query";

import { getPairQueryOptions } from "../helpers/getPairQueryOptions";

export const usePairsQueries = (pairIds: string[]) => {
  const queriesOptions = pairIds.map((pairId) => {
    const { id, chainId } = getPairConfig(pairId);

    return getPairQueryOptions(id, chainId);
  });

  return useQueries(queriesOptions);
};
