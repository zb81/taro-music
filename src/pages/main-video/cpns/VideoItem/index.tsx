import { Image, View } from "@tarojs/components";
import { VideoRoot } from "src/models/video";
import { formatCount, formatDuration } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  data: VideoRoot;
}

const VideoItem = ({ data }: Props) => {
  return (
    <View className={style.item}>
      <View className={style.album}>
        <Image
          className={style.image}
          src={data.cover}
          mode='aspectFill'
        />
        <View className={style.info}>
          <View className={style.playCount}>{formatCount(data.playCount)}</View>
          <View className={style.duration}>
            {formatDuration(data.duration)}
          </View>
        </View>
      </View>
      <View className={style.title}>
        {data.name} - {data.artistName}
      </View>
    </View>
  );
};
export default VideoItem;
