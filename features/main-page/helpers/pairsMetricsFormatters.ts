import {
  getFormattedBalance,
  getFormattedNumber,
} from "@roe-monorepo/shared-features/src/shared/helpers/formatters";

export const getFormattedSumBalance = (
  sumBalance: number | null | undefined
) => {
  if (sumBalance === undefined) {
    return "-";
  }

  if (sumBalance === null) {
    return "N/A";
  }

  return getFormattedBalance(sumBalance);
};

export const getFormattedAverageAPY = (
  averageAPY: number | null | undefined
) => {
  if (averageAPY === undefined) {
    return "-";
  }

  if (averageAPY === null) {
    return "N/A";
  }

  return getFormattedNumber(averageAPY * 100);
};
