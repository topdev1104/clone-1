import { PairModalStateProvider } from "../providers/PairModalStateProvider";
import { PairModalTransactionsProvider } from "../providers/PairModalTransactionsProvider";
import { ZapContentStateProvider } from "../providers/ZapContentStateProvider";
import { ZapContentTransactionsProvider } from "../providers/ZapContentTransactionsProvider";

import { PairModalContent } from "./PairModalContent";

export const PairModal = () => (
  <ZapContentStateProvider>
    <ZapContentTransactionsProvider>
      <PairModalStateProvider>
        <PairModalTransactionsProvider>
          <PairModalContent />
        </PairModalTransactionsProvider>
      </PairModalStateProvider>
    </ZapContentTransactionsProvider>
  </ZapContentStateProvider>
);
