import { isNativeCoin } from "@roe-monorepo/shared-features/src/queries/helpers/nativeCoin";
import { areAddressesEqual } from "@roe-monorepo/shared-features/src/web3/helpers/addresses";
import { getWrappedNativeCoinAddress } from "@roe-monorepo/shared-features/src/web3/helpers/getWrappedNativeCoinAddress";

import { toTokenAmount } from "./tokenAmount";

import type { TokenInputState } from "@roe-monorepo/shared-features/src/input-card/types/TokenInputState";
import type { Token } from "@roe-monorepo/shared-features/src/queries/types/Token";
import type { ChainId } from "@roe-monorepo/shared-features/src/web3/types/ChainId";

export const getZapSupplyTransactionParameters = (
  token0Data: Token,
  token0InputValueBig: TokenInputState["inputValueBig"],
  token1Data: Token,
  token1InputValueBig: TokenInputState["inputValueBig"]
) => {
  const token0DataAddress = token0Data.address;
  const token1DataAddress = token1Data.address;

  const token0DataAmount = toTokenAmount(
    token0InputValueBig,
    token0Data
  ).toString();
  const token1DataAmount = toTokenAmount(
    token1InputValueBig,
    token1Data
  ).toString();

  const isToken0NativeCoin = isNativeCoin(token0Data);

  const [token0Address, token0Amount] = isToken0NativeCoin
    ? [token1DataAddress, token1DataAmount]
    : [token0DataAddress, token0DataAmount];

  const [token1Address, token1Amount] = isToken0NativeCoin
    ? [token0DataAddress, token0DataAmount]
    : [token1DataAddress, token1DataAmount];

  return {
    token0Address,
    token0Amount,
    token1Address,
    token1Amount,
  };
};

export const getZapSingleSupplyTransactionParameters = (
  tokenData: Token,
  token0Data: Token,
  token1Data: Token,
  chainId: ChainId
) => {
  const tokenDataAddress = tokenData.address;
  const token0DataAddress = token0Data.address;
  const token1DataAddress = token1Data.address;

  const wrappedNativeCoinAddress = getWrappedNativeCoinAddress(chainId);

  const token0Address = isNativeCoin(tokenData)
    ? wrappedNativeCoinAddress
    : tokenDataAddress;

  const token1Address = areAddressesEqual(token0Address, token0DataAddress)
    ? token1DataAddress
    : token0DataAddress;

  return {
    token1Address,
  };
};
