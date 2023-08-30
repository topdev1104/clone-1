import { getPairConfig } from "@roe-monorepo/shared-features/src/pair/helpers/getPairConfig";
import { useQuery } from "react-query";

import { getPairQueryOptions } from "../helpers/getPairQueryOptions";

export const usePairQuery = (pairId: string) => {
  const { id, chainId } = getPairConfig(pairId);
  const queryOptions = getPairQueryOptions(id, chainId);

  return useQuery(queryOptions);
};
