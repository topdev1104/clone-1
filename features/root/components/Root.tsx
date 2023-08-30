import { Modal } from "@roe-monorepo/shared-features/src/modal/components/Modal";
import { useConnectLastWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useConnectLastWallet";

import { Header } from "../../header/components/Header";
import { MainPage } from "../../main-page/components/MainPage";
import { Container } from "../styles/Root";

export const Root = () => {
  useConnectLastWallet();

  return (
    <Container>
      <Modal />
      <Header />
      <MainPage />
    </Container>
  );
};
