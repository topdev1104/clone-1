import { getFormattedCurrency } from "@roe-monorepo/shared-features/src/shared/helpers/formatters";
import {
  CellContent,
  SubTitle,
} from "@roe-monorepo/shared-features/src/table/components/Cell";

import type { PairRow } from "../types/PairRow";
import type { FC } from "react";

type SupplyCellProps = Pick<PairRow, "totalBorrowed" | "totalSupplied">;

export const SupplyCell: FC<SupplyCellProps> = ({
  totalSupplied,
  totalBorrowed,
}) => {
  const formattedTotalSupplied = getFormattedCurrency(totalSupplied);
  const formattedTotalBorrowed = getFormattedCurrency(totalBorrowed);

  return (
    <CellContent>
      <span>{formattedTotalSupplied}</span>
      <SubTitle>{`Borrowed: ${formattedTotalBorrowed}`}</SubTitle>
    </CellContent>
  );
};
