import { getFormattedLpTokenAmount } from "../helpers/getFormattedLpTokenAmount";
import { getFormattedShareOfPool } from "../helpers/getFormattedShareOfPool";
import { getFormattedTokenPrice } from "../helpers/getFormattedTokenPrice";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { usePairModalState } from "../hooks/usePairModalState";
import { useZapContentState } from "../hooks/useZapContentState";
import {
  Container,
  TitleContainer,
  PricesContainer,
  PriceContent,
  PriceValue,
  PriceTitle,
} from "../styles/ZapPrices";

import type { TokenInputState } from "@roe-monorepo/shared-features/src/input-card/types/TokenInputState";
import type Big from "big.js";
import type { FC } from "react";

interface ZapPricesProps {
  isExpanded: boolean;
  tokenInputValueBig: TokenInputState["inputValueBig"];
  reserve: Big | undefined;
}

export const ZapPrices: FC<ZapPricesProps> = ({
  isExpanded,
  tokenInputValueBig,
  reserve,
}) => {
  const { token0State, token1State, pairData } = useZapContentState();
  const { withdrawTokenState } = usePairModalState();
  const { pairTokenQuery } = usePairModalQueries();

  const token0Data = token0State.tokenData;
  const token1Data = token1State.tokenData;

  const pairTokenData = pairTokenQuery.data;

  const reserve0 = pairData?.reserves.reserve0;
  const reserve1 = pairData?.reserves.reserve1;

  const token0Price = getFormattedTokenPrice(reserve0, reserve1);
  const token1Price = getFormattedTokenPrice(reserve1, reserve0);

  const formattedShareOfPool = getFormattedShareOfPool(
    tokenInputValueBig,
    reserve
  );

  const formattedLpTokenAmount = getFormattedLpTokenAmount(
    tokenInputValueBig,
    reserve,
    pairTokenData
  );

  const token0Symbol = token0Data?.symbol ?? "-";
  const token1Symbol = token1Data?.symbol ?? "-";
  const withdrawTokenSymbol = withdrawTokenState.tokenData?.symbol ?? "-";

  return (
    <Container isExpanded={isExpanded}>
      <TitleContainer>Prices and pool share</TitleContainer>
      <PricesContainer>
        <PriceContent>
          <PriceValue>{token0Price}</PriceValue>
          <PriceTitle>{`${token0Symbol} per ${token1Symbol}`}</PriceTitle>
        </PriceContent>
        <PriceContent>
          <PriceValue>{token1Price}</PriceValue>
          <PriceTitle>{`${token1Symbol} per ${token0Symbol}`}</PriceTitle>
        </PriceContent>
        <PriceContent>
          <PriceValue>{formattedShareOfPool}</PriceValue>
          <PriceTitle>Share of Pool</PriceTitle>
        </PriceContent>
      </PricesContainer>
      <TitleContainer>
        {`You will receive ~${formattedLpTokenAmount} ${withdrawTokenSymbol} Tokens`}
      </TitleContainer>
    </Container>
  );
};
