import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";

import { useZapContentState } from "../hooks/useZapContentState";

import { ZapPrices } from "./ZapPrices";

export const ZapContentPrices = () => {
  const { token0State, token1State, pairData } = useZapContentState();

  const token0InputValueBig = token0State.inputValueBig;
  const token1InputValueBig = token1State.inputValueBig;

  const reserve = pairData?.reserves.reserve0;

  const isExpanded =
    token0InputValueBig.gt(getZero()) && token1InputValueBig.gt(getZero());

  return (
    <ZapPrices
      isExpanded={isExpanded}
      reserve={reserve}
      tokenInputValueBig={token0InputValueBig}
    />
  );
};
