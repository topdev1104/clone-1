import { useContext } from "react";

import { PairModalTransactionsContext } from "../providers/PairModalTransactionsProvider";

export const usePairModalTransactions = () =>
  useContext(PairModalTransactionsContext);
