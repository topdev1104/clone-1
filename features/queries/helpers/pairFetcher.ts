import { getPairConfig } from "@roe-monorepo/shared-features/src/pair/helpers/getPairConfig";
import { getTokenQueryOptions } from "@roe-monorepo/shared-features/src/queries/helpers/queriesOptions";
import {
  getExp,
  toBig,
} from "@roe-monorepo/shared-features/src/shared/helpers/bigjs";
import { getChainMetadata } from "@roe-monorepo/shared-features/src/web3/helpers/getChainMetadata";
import { getProvider } from "@roe-monorepo/shared-features/src/web3/helpers/getProvider";

import { fromTokenAmount } from "../../pair-modal/helpers/tokenAmount";
import { queryClient } from "../../shared/constants/queryClient";
import {
  IUniswapV2Pair__factory as PairFactory,
  IAaveLendingPoolAddressesProviderRegistry__factory as LendingPoolAddressesProviderRegistryFactory,
  IAaveLendingPoolAddressesProvider__factory as LendingPoolAddressesProviderFactory,
  IAaveLendingPool__factory as LendingPoolFactory,
  IAavePriceOracle__factory as AavePriceOracleFactory,
  IChainLinkPriceOracle__factory as ChainLinkPriceOracleFactory,
} from "../../smart-contracts/types";

import { getPairsSwapFeesQueryOptions } from "./getPairsSwapFeesQueryOptions";

import type { Pair } from "../types/Pair";
import type { ChainId } from "@roe-monorepo/shared-features/src/web3/types/ChainId";

export const pairFetcher = async (
  id: string,
  chainId: ChainId
): Promise<Pair> => {
  const {
    source,
    pairAddress: address,
    pairIdInAddressesProviderRegistry,
  } = getPairConfig(id);
  const {
    addresses: { lendingPoolAddressesProviderRegistryAddress },
  } = getChainMetadata(chainId);
  const provider = getProvider(chainId);

  const pairContract = PairFactory.connect(address, provider);
  const lendingPoolAddressesProviderRegistryContract =
    LendingPoolAddressesProviderRegistryFactory.connect(
      lendingPoolAddressesProviderRegistryAddress,
      provider
    );

  const [token0Address, token1Address, rawReserves, addressesProvidersList] =
    await Promise.all([
      pairContract.token0(),
      pairContract.token1(),
      pairContract.getReserves(),
      lendingPoolAddressesProviderRegistryContract.getAddressesProvidersList(),
    ]);

  // getting pair's addressesProviderAddress
  // by pairIdInAddressesProviderRegistry
  const addressesProviderAddress =
    addressesProvidersList[pairIdInAddressesProviderRegistry];

  const addressesProviderContract = LendingPoolAddressesProviderFactory.connect(
    addressesProviderAddress,
    provider
  );

  const [
    lendingPoolAddress,
    aavePriceOracleAddress,
    addressesProviderId,
    token0,
    token1,
    pairsSwapFees,
  ] = await Promise.all([
    addressesProviderContract.getLendingPool(),
    addressesProviderContract.getPriceOracle(),
    lendingPoolAddressesProviderRegistryContract
      .getAddressesProviderIdByAddress(addressesProviderAddress)
      .then((value) => toBig(value).toNumber()),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token0Address)),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, token1Address)),
    queryClient.fetchQuery(getPairsSwapFeesQueryOptions()),
  ]);

  const lendingPoolContract = LendingPoolFactory.connect(
    lendingPoolAddress,
    provider
  );

  const aavePriceOracleContract = AavePriceOracleFactory.connect(
    aavePriceOracleAddress,
    provider
  );

  const [
    chainLinkPriceOracleAddress,
    { aTokenAddress, variableDebtTokenAddress, currentLiquidityRate },
  ] = await Promise.all([
    aavePriceOracleContract.getSourceOfAsset(address),
    lendingPoolContract.getReserveData(address),
  ]);

  const chainLinkPriceOracleContract = ChainLinkPriceOracleFactory.connect(
    chainLinkPriceOracleAddress,
    provider
  );

  const [rawPairTokenPrice, aToken, debtToken] = await Promise.all([
    chainLinkPriceOracleContract.latestAnswer().then(toBig),
    queryClient.fetchQuery(getTokenQueryOptions(chainId, aTokenAddress)),
    queryClient.fetchQuery(
      getTokenQueryOptions(chainId, variableDebtTokenAddress)
    ),
  ]);

  const reserves = {
    reserve0: fromTokenAmount(toBig(rawReserves.reserve0), token0),
    reserve1: fromTokenAmount(toBig(rawReserves.reserve1), token1),
  };

  const pairSwapFees =
    pairsSwapFees.chains[chainId]?.markets[addressesProviderId] ?? null;
  const swapFeesAPY = pairSwapFees ? pairSwapFees[7] : 0;
  const roeSupplyAPY = toBig(currentLiquidityRate).div(getExp(27)).toNumber();

  // hardcoded for now - 10%
  const rewardAPY = 0.1;

  // TODO: replace with real value
  const booster = 0.2;

  const pairTokenPrice = rawPairTokenPrice.div(getExp(8)).toNumber();

  return {
    id,
    chainId,
    address,
    source,
    token0,
    token1,
    aToken,
    debtToken,
    reserves,
    swapFeesAPY,
    roeSupplyAPY,
    rewardAPY,
    booster,
    pairTokenPrice,
    lendingPoolAddress,
  };
};
