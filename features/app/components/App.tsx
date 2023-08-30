import { LiveChatWidget } from "@roe-monorepo/shared-features/src/live-chat/components/LiveChatWidget";
import { ModalProvider } from "@roe-monorepo/shared-features/src/modal/providers/ModalProvider";
import { walletConnectors } from "@roe-monorepo/shared-features/src/web3/constants/walletConnectors";
import { Web3ReactProvider } from "@web3-react/core";
import Big from "big.js";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { modalComponents } from "../../modal/constants/modalComponents";
import { Root } from "../../root/components/Root";
import { queryClient } from "../../shared/constants/queryClient";
import { GlobalStyles } from "../styles/App";

Big.NE = -20;
Big.PE = 80;

const connectors = Object.values(walletConnectors);

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3ReactProvider connectors={connectors}>
      <ModalProvider modalComponents={modalComponents}>
        <GlobalStyles />
        <Root />
        <LiveChatWidget />
        <ReactQueryDevtools />
      </ModalProvider>
    </Web3ReactProvider>
  </QueryClientProvider>
);
