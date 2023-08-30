import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-0.5
  px-2
`;

export const Row = tw.div`
  flex justify-between
`;

export const Title = tw.span`
  text-white
  font-medium
`;

export const Value = tw(Title)`
  text-right
`;
