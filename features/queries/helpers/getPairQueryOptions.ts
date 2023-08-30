import { QueryType } from "../types/QueryType";

import { pairFetcher } from "./pairFetcher";

import type { Pair } from "../types/Pair";
import type { ChainId } from "@roe-monorepo/shared-features/src/web3/types/ChainId";
import type { UseQueryOptions } from "react-query/types/react/types";

export const getPairQueryOptions = (
  id: string,
  chainId: ChainId
): UseQueryOptions<Pair> => ({
  queryKey: [QueryType.PAIR, id, chainId],
  queryFn: async () => await pairFetcher(id, chainId),
  staleTime: Number.POSITIVE_INFINITY,
});
