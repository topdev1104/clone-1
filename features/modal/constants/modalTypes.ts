import { connectWalletModalType } from "@roe-monorepo/shared-features/src/connect-wallet-modal/constants/connectWalletModalType";
import { disclaimerModalType } from "@roe-monorepo/shared-features/src/disclaimer-modal/constants/disclaimerModalType";

import { pairModalType } from "../../pair-modal/constants/pairModalType";

export const modalTypes = {
  connectWallet: connectWalletModalType,
  pair: pairModalType,
  disclaimer: disclaimerModalType,
} as const;
