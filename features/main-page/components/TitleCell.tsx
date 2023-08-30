import { getImageSourceBySymbol } from "@roe-monorepo/shared-features/src/icons/helpers/getImageSourceBySymbol";

import {
  Container,
  FirstTokenIcon,
  SecondTokenIcon,
  TitleContainer,
  TokensContainer,
} from "../styles/TitleCell";

import { PairSourceLabel } from "./PairSourceLabel";

import type { PairRow } from "../types/PairRow";
import type { FC } from "react";

type TitleCellProps = Pick<PairRow, "source" | "title" | "tokens">;

export const TitleCell: FC<TitleCellProps> = ({ source, title, tokens }) => {
  const [imageSource0, imageSource1] = tokens.map(getImageSourceBySymbol);

  return (
    <Container>
      <TokensContainer>
        {imageSource0 ? <FirstTokenIcon src={imageSource0} /> : null}
        {imageSource1 ? <SecondTokenIcon src={imageSource1} /> : null}
      </TokensContainer>
      <TitleContainer>
        {title}
        <PairSourceLabel source={source} />
      </TitleContainer>
    </Container>
  );
};
