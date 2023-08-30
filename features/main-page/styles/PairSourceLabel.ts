import tw from "twin.macro";

export const BaseContainer = tw.div`
  px-2 py-0.5
  text-xs
  rounded-lg
`;

export const Quickswap = tw(BaseContainer)`
  text-white
  bg-blue
`;

export const UniswapV2 = tw(BaseContainer)`
  text-white
  bg-pink-dark
`;

export const SushiSwap = tw(BaseContainer)`
  text-white
  bg-blue-dark
`;
