import type { Pair } from "../../queries/types/Pair";

export const getPairSupplyAPY = ({
  swapFeesAPY,
  roeSupplyAPY,
}: Pick<Pair, "roeSupplyAPY" | "swapFeesAPY">) => swapFeesAPY + roeSupplyAPY;

export const getPairTotalAPY = ({
  swapFeesAPY,
  roeSupplyAPY,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rewardAPY,
}: Pick<Pair, "rewardAPY" | "roeSupplyAPY" | "swapFeesAPY">) =>
  swapFeesAPY + roeSupplyAPY;

/* + rewardAPY */
