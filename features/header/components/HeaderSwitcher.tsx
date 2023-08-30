import { ProductSwitcher } from "@roe-monorepo/shared-features/src/main-page/components/ProductSwitcher";
import { links } from "@roe-monorepo/shared-features/src/shared/constants/links";

export const HeaderSwitcher = () => (
  <ProductSwitcher
    options={[
      { title: "Supply", href: links.roeSupply, isActive: true },
      { title: "Trade", href: links.roeTrade, isActive: false },
    ]}
  />
);
