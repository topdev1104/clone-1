import { plus } from "@roe-monorepo/shared-features/src/icons/utils";

import {
  Container,
  MainButtonContainer,
} from "../styles/SupplyOrWithdrawContent";
import { PlusIcon, PlusIconContainer } from "../styles/ZapContent";

import { Info } from "./Info";
import { ZapContentPrices } from "./ZapContentPrices";
import { ZapMainButton } from "./ZapMainButton";
import { ZapTokenInputCard } from "./ZapTokenInputCard";
import { ZapTransactionLink } from "./ZapTransactionLink";

export const ZapContent = () => (
  <Container>
    <ZapTokenInputCard tokenIndex={0} />
    <PlusIconContainer>
      <PlusIcon src={plus} />
    </PlusIconContainer>
    <ZapTokenInputCard tokenIndex={1} />
    <ZapContentPrices />
    <Info />
    <MainButtonContainer>
      <ZapMainButton />
      <ZapTransactionLink />
    </MainButtonContainer>
  </Container>
);
