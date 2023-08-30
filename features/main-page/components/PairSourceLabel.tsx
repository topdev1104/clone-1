import { pairSources } from "@roe-monorepo/shared-features/src/pair/constants/pairSources";
import { PairSource } from "@roe-monorepo/shared-features/src/pair/types/PairSource";

import { Quickswap, UniswapV2, SushiSwap } from "../styles/PairSourceLabel";

import type { Pair } from "../../queries/types/Pair";
import type { FC } from "react";

const pairSourceTitleComponents = {
  [PairSource.QUICKSWAP]: Quickswap,
  [PairSource.UNISWAPV2]: UniswapV2,
  [PairSource.SUSHISWAP]: SushiSwap,
};

type PairSourceLabelProps = Pick<Pair, "source">;

export const PairSourceLabel: FC<PairSourceLabelProps> = ({ source }) => {
  const PairSourceTitleComponent = pairSourceTitleComponents[source];
  const pairSourceTitle = pairSources[source];

  return <PairSourceTitleComponent>{pairSourceTitle}</PairSourceTitleComponent>;
};
