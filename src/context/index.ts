import { createContext } from "react";

export interface GlobalData {
  screenWidth: number;
  screenHeight: number;
  statusBarHeight: number;
}

export const GlobalContext = createContext<GlobalData>({
  screenHeight: 0,
  screenWidth: 0,
  statusBarHeight: 0,
});
