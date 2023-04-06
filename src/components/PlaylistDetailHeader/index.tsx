import { PlaylistDetail } from "src/models/music";
import { View, Image, Text } from "@tarojs/components";
import { formatCount } from "src/utils/format";
import style from "./style.module.scss";

interface Props {
  playlistInfo: PlaylistDetail;
}

const PlaylistDetailHeader = ({ playlistInfo }: Props) => {
  return (
    <View className={style.header}>
      {/* <!-- 背景 --> */}
      <Image
        className={`${style["bg-image"]} ${style.absolute}`}
        mode='aspectFill'
        src={playlistInfo.coverImgUrl}
      />
      <View className={`${style["bg-cover"]} ${style.absolute}`}></View>

      {/* <!-- 内容 --> */}
      <View className={style.content}>
        <Image
          src={playlistInfo.coverImgUrl}
          mode='aspectFill'
          className={style.cover}
        />
        <View className={style.info}>
          <View className={style.name}>{playlistInfo.name}</View>
          <View className={style.creator}>
            <Image
              src={playlistInfo.creator.avatarUrl}
              mode='aspectFill'
              className={style.avatar}
            />
            <Text className={style["nick-name"]}>
              {playlistInfo.creator.nickname}
            </Text>
          </View>
          <View className={style.desc}>简介：{playlistInfo.description}</View>
        </View>
      </View>

      {/* <!-- 按钮 --> */}
      <View className={style.operation}>
        <View className={style.item}>
          <Image
            src='/assets/images/icons/favor_icon.png'
            mode='widthFix'
            className={style.icon}
          />
          <Text className={style.text}>
            {formatCount(playlistInfo.playCount)}
          </Text>
        </View>
        <View className={style.item}>
          <Image
            src='/assets/images/icons/share_icon.png'
            mode='widthFix'
            className={style.icon}
          />
          <Text className={style.text}>分享</Text>
        </View>
      </View>
    </View>
  );
};
export default PlaylistDetailHeader;
