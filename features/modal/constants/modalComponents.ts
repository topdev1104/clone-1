import { ConnectWalletModal } from "@roe-monorepo/shared-features/src/connect-wallet-modal/components/ConnectWalletModal";
import { DisclaimerModal } from "@roe-monorepo/shared-features/src/disclaimer-modal/components/DisclaimerModal";

import { PairModal } from "../../pair-modal/components/PairModal";

import { modalTypes } from "./modalTypes";

export const modalComponents = {
  [modalTypes.connectWallet]: ConnectWalletModal,
  [modalTypes.pair]: PairModal,
  [modalTypes.disclaimer]: DisclaimerModal,
};
