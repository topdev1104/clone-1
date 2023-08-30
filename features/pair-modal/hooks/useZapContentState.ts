import { useContext } from "react";

import { ZapContentStateContext } from "../providers/ZapContentStateProvider";

export const useZapContentState = () => useContext(ZapContentStateContext);
