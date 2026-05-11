import { useContext } from "react";
import { BoardContext } from "../context";

export function useBoard() {
  return useContext(BoardContext);
}
