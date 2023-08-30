import styled, { css } from "styled-components";
import tw from "twin.macro";

export const Container = tw.div`
  flex flex-row gap-6 items-center justify-center
`;

export const ActionContainer = styled.button<{ isActive?: boolean }>`
  ${tw`flex flex-row gap-1 text-gray-light items-center justify-center font-semibold text-base`}

  ${({ isActive }) => isActive && tw`text-brand`}
  
  path {
    ${({ isActive }) => isActive && css({ fill: "#3469FA" })}
  }

  :hover {
    ${tw`text-white`}
    * {
      fill: white;
    }
  }
`;
