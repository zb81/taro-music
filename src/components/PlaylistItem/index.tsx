import { Playlist } from "src/models/music";
import { View, Image } from "@tarojs/components";
import { formatCount } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  data: Playlist;
  onTap?(): void;
}

const PlaylistItem = ({ data, onTap }: Props) => {
  return (
    <View className={style.item} onTap={onTap}>
      <View className={style.album}>
        <Image className={style.image} src={data.coverImgUrl} />
        <View className={style.count}>{formatCount(data.playCount)}</View>
      </View>
      <View className={style.name}>{data.name}</View>
    </View>
  );
};
export default PlaylistItem;
