import { BaseIcon } from "@roe-monorepo/shared-features/src/shared/components/BaseIcon";
import tw from "twin.macro";

export const Container = tw.div`
  flex gap-2 h-10
`;

export const TokensContainer = tw.div`
  flex
  min-w-max
`;

export const FirstTokenIcon = tw(BaseIcon)`
  w-6
`;

export const SecondTokenIcon = tw(FirstTokenIcon)`
  -translate-x-1.5
`;

export const TitleContainer = tw.div`
  flex flex-col justify-center
`;
