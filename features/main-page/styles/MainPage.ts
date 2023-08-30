import tw from "twin.macro";

export const Container = tw.div`
  flex flex-1 justify-center
  px-6
`;

export const Content = tw.div`
  flex flex-col flex-1 gap-2
  w-full
  max-w-[864px]
`;

export const TableContainer = tw.div`
  flex flex-col
  bg-gray-dark
  rounded-lg
  border
  border-gray-newSemiLight
`;

export const HeaderSwitcherContainer = tw.div`
  flex justify-center
  md:hidden
`;
