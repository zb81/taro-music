import { PropsWithChildren } from "react";
import { Image, Text, View } from "@tarojs/components";
import style from "./style.module.scss";

interface Props {
  title?: string;
  rightText?: string;
  showRight?: boolean;
  onTapRight?: () => void;
}

const AreaHeader = ({
  title = "默认标题",
  rightText = "更多",
  showRight = true,
  onTapRight,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <View className={style.header}>
      <View className={style.title}>{title}</View>
      {showRight && (
        <View className={style.right} onTap={onTapRight}>
          <View className={style.slot}>{children}</View>
          <View className={style.default}>
            <Text>{rightText}</Text>
            <Image
              className={style.icon}
              src='/assets/images/icons/arrow-right.png'
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default AreaHeader;
