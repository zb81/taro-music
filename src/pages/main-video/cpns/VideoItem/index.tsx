import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { VideoRoot } from "src/models/video";
import { formatCount, formatDuration } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  data: VideoRoot;
}

const VideoItem = ({ data }: Props) => {
  function handleTap() {
    Taro.navigateTo({
      url: `/pages/detail-video/index?id=${data.id}`
    })
  }
  return (
    <View className={style.item} onTap={handleTap}>
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
