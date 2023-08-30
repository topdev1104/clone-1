import { ModalContext } from "@roe-monorepo/shared-features/src/modal/providers/ModalProvider";
import { useContext } from "react";

import type { ModalState } from "../types/ModalState";
import type { ModalType } from "../types/ModalType";
import type { ModalContextState } from "@roe-monorepo/shared-features/src/modal/types/ModalContextState";

export const useModal = () =>
  useContext(ModalContext) as unknown as ModalContextState<
    ModalType,
    ModalState
  >;
