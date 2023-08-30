import { MainPageStateProvider } from "../providers/MainPageStateProvider";
import { Container, Content, TableContainer } from "../styles/MainPage";

import { Banner } from "./Banner";
import { Metrics } from "./Metrics";
import { PairsTable } from "./PairsTable";
import { PairsTableHeader } from "./PairsTableHeader";

// TODO: return later
// import { HeaderSwitcher } from "../../header/components/HeaderSwitcher";

export const MainPage = () => (
  <MainPageStateProvider>
    <Container>
      <Content>
        <Banner />
        <Metrics />
        <TableContainer>
          <PairsTableHeader />
          <PairsTable />
        </TableContainer>
        {/* <HeaderSwitcherContainer>
          <HeaderSwitcher />
        </HeaderSwitcherContainer> */}
      </Content>
    </Container>
  </MainPageStateProvider>
);
