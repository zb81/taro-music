import { View, Image } from "@tarojs/components";
import { useContext } from "react";
import { GlobalContext } from "src/context";
import style from "./style.module.scss";

interface Props {
  leftChild?: React.ReactElement;
  titleChild?: React.ReactElement;
  onTapLeft?(): void;
}

const NavigationBar = ({ leftChild, titleChild, onTapLeft }: Props) => {
  const { statusBarHeight } = useContext(GlobalContext);
  return (
    <>
      {/* <!-- 状态栏占位 --> */}
      <View style={{ height: `${statusBarHeight}px` }}></View>

      <View className={style["nav-bar"]}>
        <View className={style["left"]}>
          {leftChild ? (
            <View className={style["left-slot"]}>{leftChild}</View>
          ) : (
            <View onTap={onTapLeft}>
              <Image
                className={style["icon"]}
                src='/assets/images/icons/arrow-left.png'
                mode='widthFix'
              />
            </View>
          )}
        </View>
        <View className={style["center"]}>{titleChild}</View>
        <View className={style["right"]}></View>
      </View>
    </>
  );
};
export default NavigationBar;
