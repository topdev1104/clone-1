import { isInsufficientTokenAllowance } from "@roe-monorepo/shared-features/src/input-card/helpers/tokenBalance";
import { ApproveMainButton } from "@roe-monorepo/shared-features/src/modal/components/ApproveMainButton";
import { ConnectWalletMainButton } from "@roe-monorepo/shared-features/src/modal/components/ConnectWalletMainButton";
import { SuccessfulMainButton } from "@roe-monorepo/shared-features/src/modal/components/SuccessfulMainButton";
import { TokenErrorMainButton } from "@roe-monorepo/shared-features/src/modal/components/TokenErrorMainButton";
import { WrongNetworkMainButton } from "@roe-monorepo/shared-features/src/modal/components/WrongNetworkMainButton";
import { ZeroBalanceMainButton } from "@roe-monorepo/shared-features/src/modal/components/ZeroBalanceMainButton";
import { getZero } from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { useWallet } from "@roe-monorepo/shared-features/src/web3/hooks/useWallet";

import { useZapContentState } from "../hooks/useZapContentState";
import { useZapContentTransactions } from "../hooks/useZapContentTransactions";

import { ZapSupplyMainButton } from "./ZapSupplyMainButton";

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export const ZapMainButton = () => {
  const { isConnected, chainId } = useWallet();

  const { pairData, token0State, token1State, addresses } =
    useZapContentState();
  const {
    supplyTransaction,
    token0ApproveTransaction,
    token1ApproveTransaction,
  } = useZapContentTransactions();

  const { zapBoxAddress } = addresses;

  const token0Data = token0State.tokenData;
  const token1Data = token1State.tokenData;

  const token0InputValueBig = token0State.inputValueBig;
  const token1InputValueBig = token1State.inputValueBig;

  const isToken0Error = token0State.isError;
  const isToken1Error = token1State.isError;

  const token0Error = token0State.error;
  const token1Error = token1State.error;

  const isInsufficientToken0Allowance = isInsufficientTokenAllowance(
    token0InputValueBig,
    token0Data
  );

  const isInsufficientToken1Allowance = isInsufficientTokenAllowance(
    token1InputValueBig,
    token1Data
  );

  const {
    mutation: { isSuccess },
  } = supplyTransaction;

  const isZeroBalance =
    token0InputValueBig.lte(getZero()) || token1InputValueBig.lte(getZero());

  if (!isConnected) {
    return <ConnectWalletMainButton />;
  }

  if (pairData && chainId && pairData.chainId !== chainId) {
    return <WrongNetworkMainButton />;
  }

  if (isSuccess) {
    return <SuccessfulMainButton title="Supply Successful" />;
  }

  if (isZeroBalance) {
    return <ZeroBalanceMainButton />;
  }

  if (isToken0Error || isToken1Error) {
    return (
      <TokenErrorMainButton
        error={isToken0Error ? token0Error : token1Error}
        tokenData={isToken0Error ? token0Data : token1Data}
      />
    );
  }

  if (isInsufficientToken0Allowance) {
    return (
      <ApproveMainButton
        spenderAddress={zapBoxAddress}
        tokenApproveTransaction={token0ApproveTransaction}
        tokenData={token0Data}
      />
    );
  }

  if (isInsufficientToken1Allowance) {
    return (
      <ApproveMainButton
        spenderAddress={zapBoxAddress}
        tokenApproveTransaction={token1ApproveTransaction}
        tokenData={token1Data}
      />
    );
  }

  return <ZapSupplyMainButton />;
};
