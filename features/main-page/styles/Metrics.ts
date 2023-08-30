import tw from "twin.macro";

export const Container = tw.div`
    flex flex-col
    bg-gray-dark
  rounded-lg
    border
    border-gray-newSemiLight
    gap-8
    px-6
    py-4
`;

export const Title = tw.h2`
    text-xl
    text-white
    font-semibold
`;

export const MetricsContainer = tw.div`
  flex gap-8
`;
