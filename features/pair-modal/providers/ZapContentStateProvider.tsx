import { defaultTokenInputState } from "@roe-monorepo/shared-features/src/input-card/constants/defaultTokenInputState";
import { getTokenInputError } from "@roe-monorepo/shared-features/src/input-card/helpers/getTokenInputError";
import { toInputValueBig } from "@roe-monorepo/shared-features/src/input-card/helpers/toInputValueBig";
import { useTokenData } from "@roe-monorepo/shared-features/src/input-card/hooks/useTokenData";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { getChainMetadata } from "@roe-monorepo/shared-features/src/web3/helpers/getChainMetadata";
import { createContext, useCallback, useMemo, useState } from "react";

import { getOppositeTokenAmount } from "../helpers/getOppositeTokenAmount";
import { useZapContentQueries } from "../hooks/useZapContentQueries";
import { ZapType } from "../types/ZapType";

import type { ZapContentContextState } from "../types/ZapContentContextState";
import type { TokenData } from "@roe-monorepo/shared-features/src/queries/types/Token";
import type { FC, ReactNode } from "react";

interface ZapContentStateProviderProps {
  children: ReactNode;
}

export const ZapContentStateContext = createContext<ZapContentContextState>({
  zapType: null,
  setZapType: () => undefined,

  pairData: undefined,

  token0State: defaultTokenInputState,
  token1State: defaultTokenInputState,

  addresses: {
    routerAddress: "",
    zapBoxAddress: "",
  },

  isUseZapTransactionForToken: () => false,
});

export const ZapContentStateProvider: FC<ZapContentStateProviderProps> = ({
  children,
}) => {
  const [zapType, setZapType] = useState<ZapContentContextState["zapType"]>(
    ZapType.LP
  );

  const [token0InputValue, setToken0InputValue] = useState("");
  const [token1InputValue, setToken1InputValue] = useState("");

  const { pairQuery, nativeCoinQuery, token0Query, token1Query } =
    useZapContentQueries();

  const pairData = pairQuery.data;
  const nativeCoinData = nativeCoinQuery.data;

  const chainId = pairQuery.data?.chainId;

  const [token0Data, tokens0, setToken0DataAddress] = useTokenData(
    [token0Query.data],
    nativeCoinData,
    chainId
  );
  const [token1Data, tokens1, setToken1DataAddress] = useTokenData(
    [token1Query.data],
    nativeCoinData,
    chainId
  );

  const reserve0 = pairData?.reserves.reserve0;
  const reserve1 = pairData?.reserves.reserve1;

  const token0InputValueBig = toInputValueBig(token0InputValue);
  const token1InputValueBig = toInputValueBig(token1InputValue);

  const token0Error = getTokenInputError(token0InputValueBig, token0Data);
  const token1Error = getTokenInputError(token1InputValueBig, token1Data);

  const setToken0Value = useCallback(
    (nextToken0InputValue: string) => {
      setToken0InputValue(nextToken0InputValue);

      if (reserve0 && reserve1 && reserve0.gt(getZero())) {
        const nextToken0InputValueBig = toInputValueBig(nextToken0InputValue);

        const token1Amount = getOppositeTokenAmount(
          nextToken0InputValueBig,
          reserve0,
          reserve1
        );

        const nextToken1InputValue = token1Amount.toString();
        setToken1InputValue(nextToken1InputValue);
      }
    },
    [reserve0, reserve1]
  );

  const setToken1Value = useCallback(
    (nextToken1InputValue: string) => {
      setToken1InputValue(nextToken1InputValue);

      if (reserve0 && reserve1 && reserve1.gt(getZero())) {
        const nextToken1InputValueBig = toInputValueBig(nextToken1InputValue);

        const token0Amount = getOppositeTokenAmount(
          nextToken1InputValueBig,
          reserve1,
          reserve0
        );

        const nextToken0InputValue = token0Amount.toString();
        setToken0InputValue(nextToken0InputValue);
      }
    },
    [reserve0, reserve1]
  );

  const chainMetadata = chainId ? getChainMetadata(chainId) : undefined;

  const routerAddress = chainMetadata?.addresses.routerAddress ?? "";
  const zapBoxAddress = chainMetadata?.addresses.zapBoxAddress ?? "";

  const token0State = useMemo(
    () => ({
      tokenData: token0Data,
      tokens: tokens0,
      setTokenDataAddress: setToken0DataAddress,
      inputValue: token0InputValue,
      setInputValue: setToken0Value,
      inputValueBig: token0InputValueBig,
      isError: Boolean(token0Error),
      error: token0Error,
    }),
    [
      token0Data,
      tokens0,
      setToken0DataAddress,
      token0InputValue,
      setToken0Value,
      token0InputValueBig,
      token0Error,
    ]
  );

  const token1State = useMemo(
    () => ({
      tokenData: token1Data,
      tokens: tokens1,
      setTokenDataAddress: setToken1DataAddress,
      inputValue: token1InputValue,
      setInputValue: setToken1Value,
      inputValueBig: token1InputValueBig,
      isError: Boolean(token1Error),
      error: token1Error,
    }),
    [
      token1Data,
      tokens1,
      setToken1DataAddress,
      token1InputValue,
      setToken1Value,
      token1InputValueBig,
      token1Error,
    ]
  );

  const addresses = useMemo(
    () => ({ routerAddress, zapBoxAddress }),
    [routerAddress, zapBoxAddress]
  );

  const isUseZapTransactionForToken = useCallback(
    (tokenData: TokenData) =>
      [nativeCoinQuery, token0Query, token1Query]
        .map((query) => query.data?.address)
        .includes(tokenData?.address),
    [nativeCoinQuery, token0Query, token1Query]
  );

  const value = useMemo(
    () => ({
      zapType,
      setZapType,
      pairData,
      token0State,
      token1State,
      addresses,
      isUseZapTransactionForToken,
    }),
    [
      zapType,
      pairData,
      token0State,
      token1State,
      addresses,
      isUseZapTransactionForToken,
    ]
  );

  return (
    <ZapContentStateContext.Provider value={value}>
      {children}
    </ZapContentStateContext.Provider>
  );
};
