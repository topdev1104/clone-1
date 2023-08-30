import { TableContainer } from "@roe-monorepo/shared-features/src/table/styles/TableContainer";
import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled(TableContainer)`
  ${tw`rounded-lg bg-gray-dark`}

  table {
    ${tw`w-full`}
  }
`;
