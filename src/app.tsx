import { PropsWithChildren, useState } from "react";
import { Provider } from "react-redux";
import Taro, { useLaunch } from "@tarojs/taro";
import "./app.scss";
import store from "./store";
import { GlobalContext, GlobalData } from "./context";

const App = ({ children }: PropsWithChildren) => {
  const [globalData, setGlobalData] = useState<GlobalData>({
    screenHeight: 0,
    screenWidth: 0,
    statusBarHeight: 0,
  });

  useLaunch(() => {
    const { screenWidth, screenHeight, statusBarHeight } =
      Taro.getSystemInfoSync();
    setGlobalData({
      screenHeight,
      screenWidth,
      statusBarHeight: statusBarHeight ?? 0,
    });
  });
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={globalData}>
        {children}
      </GlobalContext.Provider>
    </Provider>
  );
};
export default App;
