import { TinyInfoCard } from "@roe-monorepo/shared-features/src/main-page/components/TinyInfoCard";
import { SubTitle } from "@roe-monorepo/shared-features/src/main-page/styles/TinyInfoCard";

import { balance, APY } from "../../icons/metrics";
import {
  getFormattedAverageAPY,
  getFormattedSumBalance,
} from "../helpers/pairsMetricsFormatters";
import { usePairsMetrics } from "../hooks/usePairsMetrics";
import { Container, MetricsContainer, Title } from "../styles/Metrics";

export const Metrics = () => {
  const { sumBalance, averageAPY } = usePairsMetrics();

  const formattedSumBalance = getFormattedSumBalance(sumBalance);
  const formattedAverageAPY = getFormattedAverageAPY(averageAPY);

  return (
    <Container>
      <Title>Your Summary</Title>
      <MetricsContainer>
        <TinyInfoCard
          icon={balance}
          prefix={<SubTitle>$</SubTitle>}
          title="Balance"
          value={formattedSumBalance}
        />
        <TinyInfoCard
          icon={APY}
          postfix={<SubTitle>%</SubTitle>}
          title="Net Supply APY"
          value={formattedAverageAPY}
        />
      </MetricsContainer>
    </Container>
  );
};
