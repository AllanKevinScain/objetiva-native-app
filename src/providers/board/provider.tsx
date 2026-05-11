import { useMemo } from "react";
import type { ProvidersProps } from "../providers.type";
import { BoardActionsModal } from "./board-actions-modal";
import { BoardContext } from "./context";
import { useBoardActions } from "./hooks/use-board-actions";

export function BoardProvider(props: ProvidersProps) {
  const { children } = props;
  const { actionsModalVisible, handleActionsModal } = useBoardActions();

  const contextValues = useMemo(() => ({ handleActionsModal }), [handleActionsModal]);

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
      <BoardActionsModal visible={actionsModalVisible} onRequestClose={handleActionsModal} />
    </BoardContext.Provider>
  );
}
