import { useContext } from "react";
import { PanelContext } from "./context";

export function usePanel() {
  return useContext(PanelContext);
}
