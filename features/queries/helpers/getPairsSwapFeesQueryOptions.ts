import { QueryType } from "../types/QueryType";

import { pairsSwapFeesFetcher } from "./pairsSwapFeesFetcher";

import type { PairsSwapFeesResponse } from "../types/PairsSwapFeesResponse";
import type { UseQueryOptions } from "react-query/types/react/types";

export const getPairsSwapFeesQueryOptions =
  (): UseQueryOptions<PairsSwapFeesResponse> => ({
    queryKey: [QueryType.PAIRS_SWAP_FEES],
    queryFn: async () => await pairsSwapFeesFetcher(),
    staleTime: Number.POSITIVE_INFINITY,
  });
