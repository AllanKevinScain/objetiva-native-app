import { createContext } from "react";

type BoardContextType = {
  handleActionsModal: () => void;
  handlePageId: (id: string) => void;
};

export const BoardContext = createContext<BoardContextType>({
  handleActionsModal: () => null,
  handlePageId: () => null,
});
