import { PlaylistDetail } from "src/models/music";
import { Text, View, Image } from "@tarojs/components";
import { formatCount } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  data: PlaylistDetail;
  onTap?(): void;
}

const RankingItem = ({ data, onTap }: Props) => {
  return (
    <View className={style.item} onTap={onTap}>
      <View className={style.left}>
        <View className={style.name}>{data.name}</View>
        {data.tracks?.slice(0, 3).map((item, idx) => (
          <View key={item.id}>
            {idx + 1}. {item.name} <Text>{item.ar[0].name}</Text>
          </View>
        ))}
      </View>

      <Image className={style.right} src={data.coverImgUrl} />

      <View className={style.count}>{formatCount(data.playCount)}</View>
    </View>
  );
};
export default RankingItem;
