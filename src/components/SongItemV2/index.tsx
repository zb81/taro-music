import { Track } from "src/models/music";
import { View, Text, Image } from "@tarojs/components";
import style from "./style.module.scss";

interface Props {
  index: number;
  item: Track;
}

const SongItemV2 = ({ index, item }: Props) => {
  function onTap() {
    console.log(item.id);
  }
  return (
    <View className={style.item} onTap={onTap}>
      <View className={style.index}>{index + 1}</View>
      <View className={style.info}>
        <View className={style.name}>{item.name}</View>
        <View className={style.source}>
          <Image
            className={style.icon}
            src='/assets/images/icons/sq_icon.png'
          />
          <Text>
            {item.ar[0].name} · {item.al.name}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default SongItemV2;
