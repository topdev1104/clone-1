import { defaultTokenInputState } from "@roe-monorepo/shared-features/src/input-card/constants/defaultTokenInputState";
import { getTokenInputError } from "@roe-monorepo/shared-features/src/input-card/helpers/getTokenInputError";
import { toInputValueBig } from "@roe-monorepo/shared-features/src/input-card/helpers/toInputValueBig";
import { useTokenData } from "@roe-monorepo/shared-features/src/input-card/hooks/useTokenData";
import { createContext, useMemo, useState } from "react";

import { getFormattedPairTitle } from "../../pair/helpers/getFormattedPairTitle";
import { usePairModalQueries } from "../hooks/usePairModalQueries";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { useZapContentState } from "../hooks/useZapContentState";
import { TabType } from "../types/TabType";
import { ZapType } from "../types/ZapType";

import type { PairModalContextState } from "../types/PairModalContextState";
import type { FC, ReactNode } from "react";

interface PairModalStateProviderProps {
  children: ReactNode;
}

export const PairModalStateContext = createContext<PairModalContextState>({
  tabType: TabType.SUPPLY,
  setTabType: () => undefined,

  pairData: undefined,

  supplyTokenState: defaultTokenInputState,
  withdrawTokenState: defaultTokenInputState,
});

export const PairModalStateProvider: FC<PairModalStateProviderProps> = ({
  children,
}) => {
  const [tabType, setTabType] = useState(TabType.SUPPLY);
  const [supplyTokenInputValue, setSupplyTokenInputValue] = useState("");
  const [withdrawTokenInputValue, setWithdrawTokenInputValue] = useState("");

  const { pairQuery, pairTokenQuery, aTokenQuery } = usePairModalQueries();
  const { nativeCoinQuery, token0Query, token1Query } = useZapContentQueries();
  const { zapType } = useZapContentState();

  const pairData = pairQuery.data;
  const chainId = pairData?.chainId;
  const pairTitle = pairData ? getFormattedPairTitle(pairData) : "-";

  // update symbols for pairTokenData and aTokenData
  const pairTokenData = pairTokenQuery.data
    ? {
        ...pairTokenQuery.data,
        symbol: `${pairTitle} LP`,
      }
    : undefined;

  const aTokenData = aTokenQuery.data
    ? {
        ...aTokenQuery.data,
        symbol: `ROE ${pairTitle} LP`,
      }
    : undefined;

  const [supplyTokenData, supplyTokens, setSupplyTokenDataAddress] =
    useTokenData(
      zapType === ZapType.LP
        ? [pairTokenData]
        : [token0Query.data, token1Query.data],
      nativeCoinQuery.data,
      chainId
    );
  const [withdrawTokenData, withdrawTokens, setWithdrawTokenDataAddress] =
    useTokenData([aTokenData]);

  const supplyTokenInputValueBig = toInputValueBig(supplyTokenInputValue);
  const withdrawTokenInputValueBig = toInputValueBig(withdrawTokenInputValue);

  const supplyTokenError = getTokenInputError(
    supplyTokenInputValueBig,
    supplyTokenData
  );
  const withdrawTokenError = getTokenInputError(
    withdrawTokenInputValueBig,
    withdrawTokenData
  );

  const supplyTokenState = useMemo(
    () => ({
      tokenData: supplyTokenData,
      tokens: supplyTokens,
      setTokenDataAddress: setSupplyTokenDataAddress,
      inputValue: supplyTokenInputValue,
      setInputValue: setSupplyTokenInputValue,
      inputValueBig: supplyTokenInputValueBig,
      isError: Boolean(supplyTokenError),
      error: supplyTokenError,
    }),
    [
      supplyTokenData,
      supplyTokens,
      setSupplyTokenDataAddress,
      supplyTokenInputValue,
      setSupplyTokenInputValue,
      supplyTokenInputValueBig,
      supplyTokenError,
    ]
  );

  const withdrawTokenState = useMemo(
    () => ({
      tokenData: withdrawTokenData,
      tokens: withdrawTokens,
      setTokenDataAddress: setWithdrawTokenDataAddress,
      inputValue: withdrawTokenInputValue,
      setInputValue: setWithdrawTokenInputValue,
      inputValueBig: withdrawTokenInputValueBig,
      isError: Boolean(withdrawTokenError),
      error: withdrawTokenError,
    }),
    [
      withdrawTokenData,
      withdrawTokens,
      setWithdrawTokenDataAddress,
      withdrawTokenInputValue,
      setWithdrawTokenInputValue,
      withdrawTokenInputValueBig,
      withdrawTokenError,
    ]
  );

  const value = useMemo(
    () => ({
      tabType,
      setTabType,
      pairData,
      supplyTokenState,
      withdrawTokenState,
    }),
    [tabType, setTabType, pairData, supplyTokenState, withdrawTokenState]
  );

  return (
    <PairModalStateContext.Provider value={value}>
      {children}
    </PairModalStateContext.Provider>
  );
};
