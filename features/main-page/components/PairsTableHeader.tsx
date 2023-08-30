import { getFormattedCurrency } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";

import { usePairsMetrics } from "../hooks/usePairsMetrics";
import { Container, Title, TVLContainer } from "../styles/PairsTableHeader";

// TODO: return later
// import { PairsTableFilter } from "./PairsTableFilter";

export const PairsTableHeader = () => {
  const { sumTVL } = usePairsMetrics();
  const formattedSumTVL = sumTVL ? getFormattedCurrency(sumTVL) : "-";

  return (
    <Container>
      <Title>Supply LP Tokens</Title>
      <TVLContainer>{`TVL ${formattedSumTVL}`}</TVLContainer>
      {/* <PairsTableFilter /> */}
    </Container>
  );
};
