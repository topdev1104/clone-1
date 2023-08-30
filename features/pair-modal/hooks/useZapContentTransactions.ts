import { useContext } from "react";

import { ZapContentTransactionsContext } from "../providers/ZapContentTransactionsProvider";

export const useZapContentTransactions = () =>
  useContext(ZapContentTransactionsContext);
