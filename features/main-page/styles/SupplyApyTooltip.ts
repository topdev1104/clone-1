import styled from "styled-components";
import tw from "twin.macro";

export const Container = tw.div`
  flex flex-col gap-2
`;

export const Content = tw.div`
  flex flex-col gap-1
`;

export const Title = tw.span`
  text-xs text-white
  font-medium
`;

export const Item = tw.div`
  flex gap-1
`;

export const Value = tw(Title)`
  text-blue-light
`;

export const TooltipTitle = tw(Title)`
  font-semibold
`;

export const SubTitle = tw.span`
  text-xs text-gray-light
`;

export const Link = styled.a.attrs({
  target: "_blank",
})`
  ${tw`
    text-xs text-blue-light
    hover:text-blue-light
  `}
`;
