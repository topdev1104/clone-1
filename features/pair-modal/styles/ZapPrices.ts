import { BaseExpander } from "@roe-monorepo/shared-features/src/shared/components/BaseExpander";
import tw from "twin.macro";

export const Container = tw(BaseExpander)`
  flex flex-col
  bg-black-light
  rounded-3xl
  border border-gray
`;

export const TitleContainer = tw.div`
  flex
  px-3 py-4
  text-sm text-white
  font-semibold
`;

export const PricesContainer = tw.div`
  flex justify-between
  px-6 py-3
  border-t border-b border-gray
`;

export const PriceContent = tw.div`
  flex flex-col
  items-center
`;

export const PriceValue = tw.span`
  text-white
  font-semibold
`;

export const PriceTitle = tw.span`
  text-sm text-gray-light
  font-medium
`;
