import { BaseModal } from "@roe-monorepo/shared-features/src/shared/components/BaseModal";
import tw from "twin.macro";

export const ModalContainer = tw(BaseModal)`
  gap-4
  w-[448px] max-w-md
`;

export const Separator = tw.div`
    border-b border-gray-newSemiLight
`;

export const TabsContainer = tw.div`
  flex justify-evenly
`;
