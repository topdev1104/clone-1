import { BaseButton } from "@roe-monorepo/shared-features/src/shared/components/BaseButton";
import styled from "styled-components";
import tw from "twin.macro";

interface ButtonProps {
  isActive: boolean;
}

export const Button = styled(BaseButton)<ButtonProps>`
  ${tw`
    text-3xl
    p-0
    border-none
  `}

  ${({ isActive }) => isActive && tw`text-brand`}
`;
