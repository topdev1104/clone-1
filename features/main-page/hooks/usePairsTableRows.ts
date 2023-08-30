import { getPairIds } from "@roe-monorepo/shared-features/src/pair/helpers/getPairIds";
import { useTokensQueries } from "@roe-monorepo/shared-features/src/queries/hooks/useTokensQueries";

import { usePairsQueries } from "../../queries/hooks/usePairsQueries";
import { toATokenQueryParameters } from "../helpers/toATokenQueryParameters";
import { toPairRow } from "../helpers/toPairRow";
import { toPairTokenQueryParameters } from "../helpers/toPairTokenQueryParameters";

export const usePairsTableRows = () => {
  const pairIds = getPairIds();
  const pairsQueries = usePairsQueries(pairIds);

  const pairTokensQueriesParameters = pairIds.map((pairId, index) =>
    toPairTokenQueryParameters(pairId, pairsQueries[index])
  );

  const aTokensQueriesParameters = pairIds.map((pairId, index) =>
    toATokenQueryParameters(pairId, pairsQueries[index])
  );

  const pairTokensQueries = useTokensQueries(pairTokensQueriesParameters);
  const aTokensQueries = useTokensQueries(aTokensQueriesParameters);

  const toPairRowParameters = pairsQueries.map((pairQuery, index) => {
    const pairQueryData = pairQuery.data;
    const pairTokenQueryData = pairTokensQueries[index].data;
    const aTokenQueryData = aTokensQueries[index].data;

    return {
      pairQueryData,
      pairTokenQueryData,
      aTokenQueryData,
    };
  });

  return toPairRowParameters.map(
    ({ pairQueryData, pairTokenQueryData, aTokenQueryData }) =>
      pairQueryData
        ? toPairRow(pairQueryData, pairTokenQueryData, aTokenQueryData)
        : undefined
  );
};
