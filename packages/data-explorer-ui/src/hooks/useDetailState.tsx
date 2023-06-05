import { useContext } from "react";
import {
  DetailStateContext,
  DetailStateContextProps,
} from "../providers/detailState";

/**
 * Returns detail view state context.
 * @returns detail view state context.
 */
export const useDetailState = (): DetailStateContextProps => {
  return useContext(DetailStateContext);
};
