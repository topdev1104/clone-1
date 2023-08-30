import { useTokenQuery } from "@roe-monorepo/shared-features/src/queries/hooks/useTokenQuery";

import { toATokenQueryParameters } from "../../main-page/helpers/toATokenQueryParameters";
import { toPairTokenQueryParameters } from "../../main-page/helpers/toPairTokenQueryParameters";
import { useModal } from "../../modal/hooks/useModal";
import { usePairQuery } from "../../queries/hooks/usePairQuery";

export const usePairModalQueries = () => {
  const { modalState } = useModal();
  const { pairId = "" } = modalState ?? {};

  const pairQuery = usePairQuery(pairId);

  const pairTokenParameters = toPairTokenQueryParameters(pairId, pairQuery);
  const pairTokenQuery = useTokenQuery(pairTokenParameters);

  const aTokenParameters = toATokenQueryParameters(pairId, pairQuery);
  const aTokenQuery = useTokenQuery(aTokenParameters);

  return {
    pairQuery,
    pairTokenQuery,
    aTokenQuery,
  };
};
