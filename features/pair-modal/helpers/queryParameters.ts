import { getPairConfig } from "@roe-monorepo/shared-features/src/pair/helpers/getPairConfig";
import { NATIVE_COIN_ADDRESS } from "@roe-monorepo/shared-features/src/queries/constants/nativeCoin";
import { getChainMetadata } from "@roe-monorepo/shared-features/src/web3/helpers/getChainMetadata";

import type { Pair } from "../../queries/types/Pair";
import type { TokenQueryParameters } from "@roe-monorepo/shared-features/src/queries/types/TokenQueryParameters";
import type { UseQueryResult } from "react-query";

export const toZapTokenQueryParameters = (
  pairId: string,
  pairQuery: UseQueryResult<Pair>,
  tokenIndex: 0 | 1
): TokenQueryParameters => {
  const { chainId } = getPairConfig(pairId);

  const token0 = pairQuery.data?.token0;
  const token1 = pairQuery.data?.token1;

  const address = tokenIndex === 0 ? token0?.address : token1?.address;
  const tokenAddress = address ?? null;

  const {
    addresses: { zapBoxAddress },
  } = getChainMetadata(chainId);

  return {
    chainId,
    tokenAddress,
    spenderAddress: zapBoxAddress,
  };
};

export const toNativeCoinQueryParameters = (
  pairId: string
): TokenQueryParameters => {
  const { chainId } = getPairConfig(pairId);

  const tokenAddress = NATIVE_COIN_ADDRESS;

  return {
    chainId,
    tokenAddress,
  };
};
