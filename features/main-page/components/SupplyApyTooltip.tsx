import { pairSources } from "@roe-monorepo/shared-features/src/pair/constants/pairSources";
import { links } from "@roe-monorepo/shared-features/src/shared/constants/links";
import { getFormattedAPY } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";

import {
  Container,
  Content,
  Item,
  TooltipTitle,
  Title,
  SubTitle,
  Value,
  Link,
} from "../styles/SupplyApyTooltip";

import type { Pair } from "../../queries/types/Pair";
import type { FC } from "react";

type SupplyAPYTooltipProps = Pick<
  Pair,
  "rewardAPY" | "roeSupplyAPY" | "source" | "swapFeesAPY"
>;

export const SupplyAPYTooltip: FC<SupplyAPYTooltipProps> = ({
  source,
  swapFeesAPY,
  roeSupplyAPY,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rewardAPY,
}) => {
  const pairSourceTitle = pairSources[source];

  const formattedSwapFeesAPY = getFormattedAPY(swapFeesAPY);
  const formattedRoeSupplyAPY = getFormattedAPY(roeSupplyAPY);

  // const formattedRewardAPY = getFormattedAPY(rewardAPY);

  return (
    <Container>
      <TooltipTitle>Supply APY Breakdown</TooltipTitle>
      <Content>
        <Item>
          <Value>{formattedSwapFeesAPY}</Value>
          <Title>{`${pairSourceTitle} Fees`}</Title>
          <SubTitle>(avg. over past 7 days)</SubTitle>
        </Item>
        <Item>
          <Value>{formattedRoeSupplyAPY}</Value>
          <Title>ROE Supply Interest</Title>
        </Item>
        {/* <Item>
          <Value>{formattedRewardAPY}</Value>
          <Title>ROE Token Rewards</Title>
        </Item> */}
      </Content>
      <Link href={links.gitBookSupply}>Learn More</Link>
    </Container>
  );
};
