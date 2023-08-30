import { BaseIcon } from "@roe-monorepo/shared-features/src/shared/components/BaseIcon";
import tw from "twin.macro";

export const Container = tw.header`
  flex justify-between items-center gap-2
  p-6
`;

export const LogoContainer = tw.div`
  flex items-center gap-16
  lg:flex-1
`;

export const AppLogoIcon = tw(BaseIcon)`
  w-24
  hidden md:block
`;

export const AppLogoMobileIcon = tw(BaseIcon)`
  w-6
  block md:hidden
`;

export const HeaderSwitcherContainer = tw.div`
  hidden
  md:flex
  lg:(flex-1 justify-center)
`;

export const ButtonsContainer = tw.div`
  flex flex-1 justify-end gap-2
`;
