import { InputCard } from "@roe-monorepo/shared-features/src/input-card/components/InputCard";

import { useZapContentState } from "../hooks/useZapContentState";

import type { FC } from "react";

interface ZapTokenInputCardProps {
  tokenIndex: 0 | 1;
}

export const ZapTokenInputCard: FC<ZapTokenInputCardProps> = ({
  tokenIndex,
}) => {
  const { token0State, token1State } = useZapContentState();

  const tokenState = tokenIndex === 0 ? token0State : token1State;

  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = tokenState;

  return (
    <InputCard
      inputValue={inputValue}
      isError={isError}
      setInputValue={setInputValue}
      setTokenDataAddress={setTokenDataAddress}
      tokenData={tokenData}
      tokens={tokens}
    />
  );
};
