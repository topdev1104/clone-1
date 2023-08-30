import { getFormattedAPY } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";
import { Tooltip } from "@roe-monorepo/shared-features/src/tooltip/components/Tooltip";
import { getFormattedTokenBalance } from "@roe-monorepo/shared-features/src/web3/helpers/getFormattedTokenBalance";

import { SupplyAPYTooltip } from "../../main-page/components/SupplyApyTooltip";
import { getPairTotalAPY } from "../../pair/helpers/getPairApy";
import { useTargetTokenState } from "../hooks/tokenState";
import { usePairModalState } from "../hooks/usePairModalState";
import { Container, Row, Title, Value } from "../styles/Info";
import { TabType } from "../types/TabType";

export const Info = () => {
  const { tabType, pairData } = usePairModalState();
  const { tokenData } = useTargetTokenState();

  const formattedTokenBalance = getFormattedTokenBalance(tokenData);

  const formattedSupplyAPY = pairData
    ? getFormattedAPY(getPairTotalAPY(pairData))
    : "-";

  // TODO: add Reward APY later
  // const formattedRewardAPY = pairData
  //   ? getFormattedAPY(pairData.rewardAPY)
  //   : "-";

  const formattedFees = getFormattedAPY(0);

  const title =
    tabType === TabType.SUPPLY
      ? "Your ROE LP Token Balance"
      : "Your LP Token Balance";

  return (
    <Container>
      <Row>
        <Title>{title}</Title>
        <Value>{formattedTokenBalance}</Value>
      </Row>
      <Row>
        <Title>Supply APY</Title>
        <Tooltip
          content={
            pairData ? (
              <SupplyAPYTooltip
                rewardAPY={pairData.rewardAPY}
                roeSupplyAPY={pairData.roeSupplyAPY}
                source={pairData.source}
                swapFeesAPY={pairData.swapFeesAPY}
              />
            ) : null
          }
        >
          <Value>{formattedSupplyAPY}</Value>
        </Tooltip>
      </Row>
      {/* <Row>
        <Title>Reward APY</Title>
        <Value>{formattedRewardAPY}</Value>
      </Row> */}
      <Row>
        <Title>Fees</Title>
        <Value>{formattedFees}</Value>
      </Row>
    </Container>
  );
};
