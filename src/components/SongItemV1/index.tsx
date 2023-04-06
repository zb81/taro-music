import { Track } from "src/models/music";
import { View, Image } from "@tarojs/components";
import style from "./style.module.scss";

interface Props {
  data: Track;
}

const SongItemV1 = ({ data }: Props) => {
  function handleTap() {
    console.log(data.id)
    // 页面跳转
    // Taro.navigateTo({
    //   url: `/pages/music-player/index?id=${id}`,
    // });
    // 请求歌曲数据
    // playerStore.dispatch('playMusicWithSongIdAction', { id })
  }
  return (
    <View className={style.item} onTap={handleTap}>
      <Image className={style.image} src={data.al.picUrl} />

      <View className={style.content}>
        <View className={style.name}>{data.name}</View>
        <View className={style.source}>
          {data.ar[0].name} - {data.al.name}
        </View>
      </View>

      <View className={style.arrow}>
        <Image
          className={style.icon}
          src='/assets/images/icons/arrow-right.png'
        />
      </View>
    </View>
  );
};
export default SongItemV1;
