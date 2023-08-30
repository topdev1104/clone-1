import { useCallback } from "react";

import { modalTypes } from "../../modal/constants/modalTypes";
import { useModal } from "../../modal/hooks/useModal";

export const useShowPairModal = () => {
  const { pushModal } = useModal();

  const showPairModal = useCallback(
    (pairId: string) => {
      pushModal(modalTypes.pair, { pairId });
    },
    [pushModal]
  );

  return { showPairModal };
};
