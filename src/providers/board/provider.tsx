import { useMemo, useState } from "react";
import type { ProvidersProps } from "../providers.type";
import { BoardActionsModal } from "./board-actions-modal";
import { BoardContext } from "./context";
import { useBoardActions } from "./hooks/use-board-actions";

export function BoardProvider({ children }: ProvidersProps) {
  const [currentPageId, setPageId] = useState<string | null>(null);

  function handlePageId(id: string) {
    setPageId(id);
  }

  const { actionsModalVisible, handleActionsModal } = useBoardActions();

  const contextValues = useMemo(
    () => ({
      handleActionsModal,
      handlePageId,
    }),
    [handleActionsModal],
  );

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
      <BoardActionsModal
        currentPageId={currentPageId}
        visible={actionsModalVisible}
        onRequestClose={handleActionsModal}
      />
    </BoardContext.Provider>
  );
}
