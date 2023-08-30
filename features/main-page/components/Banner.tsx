import { PageBanner } from "@roe-monorepo/shared-features/src/main-page/components/PageBanner";
import { links } from "@roe-monorepo/shared-features/src/shared/constants/links";

import { background, icon } from "../../icons/banner";

export const Banner = () => (
  <PageBanner
    backgroundSrc={background}
    iconSrc={icon}
    link={links.gitBookSupply}
    titles={[
      "Supply Your LP Tokens",
      "AMM Swap Fees, Supply Interest And More!",
    ]}
  />
);
