import { useContext } from "react";

import { PairModalStateContext } from "../providers/PairModalStateProvider";

export const usePairModalState = () => useContext(PairModalStateContext);
