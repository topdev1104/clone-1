import { isNativeCoin } from "@roe-monorepo/shared-features/src/queries/helpers/nativeCoin";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { areAddressesEqual } from "@roe-monorepo/shared-features/src/web3/helpers/addresses";
import { getWrappedNativeCoinAddress } from "@roe-monorepo/shared-features/src/web3/helpers/getWrappedNativeCoinAddress";

import { useSourceTokenState } from "../hooks/tokenState";
import { useZapContentState } from "../hooks/useZapContentState";

import { ZapPrices } from "./ZapPrices";

export const SupplyOrWithdrawContentPrices = () => {
  const { tokenData, inputValueBig } = useSourceTokenState();
  const { token0State, pairData, isUseZapTransactionForToken } =
    useZapContentState();

  const token0Address = token0State.tokenData?.address ?? "";
  const rawTokenDataAddress = tokenData?.address ?? "";

  const chainId = pairData?.chainId;
  const reserve0 = pairData?.reserves.reserve0;
  const reserve1 = pairData?.reserves.reserve1;

  // because we will supply only single asset
  // and half of it will be used for swap to another asset
  const tokenInputValueBig = inputValueBig.div(2);

  const wrappedNativeCoinAddress = chainId
    ? getWrappedNativeCoinAddress(chainId)
    : "";

  const tokenDataAddress =
    tokenData && isNativeCoin(tokenData)
      ? wrappedNativeCoinAddress
      : rawTokenDataAddress;

  const reserve = areAddressesEqual(tokenDataAddress, token0Address)
    ? reserve0
    : reserve1;

  const isExpanded =
    isUseZapTransactionForToken(tokenData) && tokenInputValueBig.gt(getZero());

  return (
    <ZapPrices
      isExpanded={isExpanded}
      reserve={reserve}
      tokenInputValueBig={tokenInputValueBig}
    />
  );
};
