import { getFormattedAPY } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";
import { Tooltip } from "@roe-monorepo/shared-features/src/tooltip/components/Tooltip";

import { getPairTotalAPY } from "../../pair/helpers/getPairApy";
import { Title } from "../styles/SupplyApyCell";

import { SupplyAPYTooltip } from "./SupplyApyTooltip";

import type { Pair } from "../../queries/types/Pair";
import type { FC } from "react";

// import {
//   CellContent,
//   SubTitle,
// } from "@roe-monorepo/shared-features/src/table/components/Cell";
// import { SubTitleContainer, TokenIcon } from "../styles/SupplyApyCell";
// import { roe } from "../../icons/brand";

type SupplyAPYCellProps = Pick<
  Pair,
  "rewardAPY" | "roeSupplyAPY" | "source" | "swapFeesAPY"
>;

export const SupplyAPYCell: FC<SupplyAPYCellProps> = ({
  source,
  swapFeesAPY,
  roeSupplyAPY,
  rewardAPY,
}) => {
  // const supplyAPY = getPairSupplyAPY({ swapFeesAPY, roeSupplyAPY });

  const totalAPY = getPairTotalAPY({
    swapFeesAPY,
    roeSupplyAPY,
    rewardAPY,
  });

  // const formattedSupplyAPY = getFormattedAPY(supplyAPY);
  // const formattedRewardAPY = getFormattedAPY(rewardAPY);
  const formattedTotalAPY = getFormattedAPY(totalAPY);

  // return (
  //   <CellContent>
  //     <span>{formattedTotalAPY}</span>
  //     <Tooltip
  //       content={
  //         <SupplyAPYTooltip
  //           rewardAPY={rewardAPY}
  //           roeSupplyAPY={roeSupplyAPY}
  //           source={source}
  //           swapFeesAPY={swapFeesAPY}
  //         />
  //       }
  //       disabledUnderline
  //     >
  //       <SubTitleContainer>
  //         <SubTitle>{`${formattedSupplyAPY} +`}</SubTitle>
  //         <TokenIcon src={roe} />
  //         <SubTitle>{formattedRewardAPY}</SubTitle>
  //       </SubTitleContainer>
  //     </Tooltip>
  //   </CellContent>
  // );

  return (
    <Tooltip
      content={
        <SupplyAPYTooltip
          rewardAPY={rewardAPY}
          roeSupplyAPY={roeSupplyAPY}
          source={source}
          swapFeesAPY={swapFeesAPY}
        />
      }
    >
      <Title>{formattedTotalAPY}</Title>
    </Tooltip>
  );
};
