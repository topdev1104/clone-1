import { useTokenQuery } from "@roe-monorepo/shared-features/src/queries/hooks/useTokenQuery";

import { useModal } from "../../modal/hooks/useModal";
import { usePairQuery } from "../../queries/hooks/usePairQuery";
import {
  toNativeCoinQueryParameters,
  toZapTokenQueryParameters,
} from "../helpers/queryParameters";

export const useZapContentQueries = () => {
  const { modalState } = useModal();
  const { pairId = "" } = modalState ?? {};

  const pairQuery = usePairQuery(pairId);

  const nativeCoinParameters = toNativeCoinQueryParameters(pairId);
  const nativeCoinQuery = useTokenQuery(nativeCoinParameters);

  const token0Parameters = toZapTokenQueryParameters(pairId, pairQuery, 0);
  const token0Query = useTokenQuery(token0Parameters);

  const token1Parameters = toZapTokenQueryParameters(pairId, pairQuery, 1);
  const token1Query = useTokenQuery(token1Parameters);

  return {
    pairQuery,
    nativeCoinQuery,
    token0Query,
    token1Query,
  };
};
