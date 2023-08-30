import { InputCard } from "@roe-monorepo/shared-features/src/input-card/components/InputCard";

import { useSourceTokenState } from "../hooks/tokenState";

export const PairTokenInputCard = () => {
  const {
    tokenData,
    tokens,
    setTokenDataAddress,
    inputValue,
    setInputValue,
    isError,
  } = useSourceTokenState();

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
