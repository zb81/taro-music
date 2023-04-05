import { View, Image } from "@tarojs/components";
import { RelatedVideo } from "src/models/video";
import { formatCount } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  data: RelatedVideo;
  onTap(): void;
}

const DetailVideoItem = ({ data, onTap }: Props) => {
  return (
    <View
      className={style.item}
      onTap={onTap}
    >
      <View className={style.album}>
        <Image className={style.image} src={data.cover} mode='aspectFill' />
        <View className={style.count}>{formatCount(data.playCount)}</View>
      </View>

      <View className={style.info}>
        <View className={style.title}>{data.name}</View>
        <View className={style.author}>{data.artistName}</View>
      </View>
    </View>
  );
};
export default DetailVideoItem;
