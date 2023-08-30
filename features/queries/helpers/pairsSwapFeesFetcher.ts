import type { PairsSwapFeesResponse } from "../types/PairsSwapFeesResponse";

export const pairsSwapFeesFetcher =
  async (): Promise<PairsSwapFeesResponse> => {
    const url = "https://api.roe.finance/lp_returns.json";

    const response = await fetch(url);

    return await (response.json() as Promise<PairsSwapFeesResponse>);
  };
