import { PairChainIcon } from "@roe-monorepo/shared-features/src/main-page/components/PairChainIcon";
import { Table } from "@roe-monorepo/shared-features/src/table/components/Table";
import { getFormattedTokenBalance } from "@roe-monorepo/shared-features/src/web3/helpers/getFormattedTokenBalance";
import { useCallback } from "react";

import { getPairTotalAPY } from "../../pair/helpers/getPairApy";
import { useMainPageState } from "../hooks/useMainPageState";
import { usePairsTableRows } from "../hooks/usePairsTableRows";
import { useShowPairModal } from "../hooks/useShowPairModal";
import { Container } from "../styles/PairsTable";

import { SupplyAPYCell } from "./SupplyApyCell";
import { SupplyCell } from "./SupplyCell";
import { TitleCell } from "./TitleCell";

import type { PairRow } from "../types/PairRow";
import type { Column } from "@roe-monorepo/shared-features/src/table/types/Column";

// TODO: add Supply and Booster buttons later
// import { BoosterButton } from "./BoosterButton";
// import { SupplyButton } from "./SupplyButton";

const columns: Column<PairRow>[] = [
  {
    key: "title",
    title: "LP Tokens",

    render: ({ source, title, tokens }) => (
      <TitleCell source={source} title={title} tokens={tokens} />
    ),

    filterBy: ({ tokens }) => tokens,
  },
  {
    key: "chainId",
    title: "Network",

    render: ({ chainId }) => <PairChainIcon chainId={chainId} />,
    sortBy: ({ chainId }) => chainId,
  },
  {
    key: "totalSupplied",
    title: "Supply",

    render: ({ totalSupplied, totalBorrowed }) => (
      <SupplyCell totalBorrowed={totalBorrowed} totalSupplied={totalSupplied} />
    ),
  },
  {
    key: "roeSupplyAPY",
    title: "Supply APY",

    render: ({ source, swapFeesAPY, roeSupplyAPY, rewardAPY }) => (
      <SupplyAPYCell
        rewardAPY={rewardAPY}
        roeSupplyAPY={roeSupplyAPY}
        source={source}
        swapFeesAPY={swapFeesAPY}
      />
    ),

    sortBy: ({ swapFeesAPY, roeSupplyAPY, rewardAPY }) =>
      getPairTotalAPY({ swapFeesAPY, roeSupplyAPY, rewardAPY }),
  },

  // TODO: add Reward APY later
  // {
  //   key: "rewardAPY",
  //   title: "Reward APY",
  //   render: ({ rewardAPY }) => getFormattedAPY(rewardAPY),
  // },

  // TODO: add Booster button later
  // {
  //   key: "booster",
  //   title: "Booster",
  //   render: ({ booster }) => <BoosterButton booster={booster} />,
  // },
  {
    key: "walletPairToken",
    title: "LP Balance",
    render: ({ walletPairToken }) => getFormattedTokenBalance(walletPairToken),

    sortBy: ({ walletPairToken }) =>
      walletPairToken?.balance?.toNumber() ?? null,
  },
  {
    key: "walletAToken",
    title: "ROE LP Balance",
    render: ({ walletAToken }) => getFormattedTokenBalance(walletAToken),
    sortBy: ({ walletAToken }) => walletAToken?.balance?.toNumber() ?? null,
  },

  // TODO: add Supply button later
  // {
  //   render: ({ id }) => <SupplyButton pairId={id} />,
  // },
];

const getRowKey = (row: PairRow) => row.id;

export const PairsTable = () => {
  const rows = usePairsTableRows();
  const { filterInputValue } = useMainPageState();
  const { showPairModal } = useShowPairModal();

  const handleRowClick = useCallback(
    (row: PairRow) => {
      showPairModal(row.id);
    },
    [showPairModal]
  );

  return (
    <Container>
      <Table
        columns={columns}
        filterInputValue={filterInputValue}
        getRowKey={getRowKey}
        onRowClick={handleRowClick}
        rows={rows}
      />
    </Container>
  );
};
