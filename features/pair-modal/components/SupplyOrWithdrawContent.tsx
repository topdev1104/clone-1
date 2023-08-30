import {
  Container,
  MainButtonContainer,
} from "../styles/SupplyOrWithdrawContent";

import { Info } from "./Info";
import { MainButton } from "./MainButton";
import { PairTokenInputCard } from "./PairTokenInputCard";
import { SupplyOrWithdrawContentPrices } from "./SupplyOrWithdrawContentPrices";
import { SupplyOrWithdrawTransactionLink } from "./SupplyOrWithdrawTransactionLink";

export const SupplyOrWithdrawContent = () => (
  <Container>
    <PairTokenInputCard />
    <SupplyOrWithdrawContentPrices />
    <Info />
    <MainButtonContainer>
      <MainButton />
      <SupplyOrWithdrawTransactionLink />
    </MainButtonContainer>
  </Container>
);
