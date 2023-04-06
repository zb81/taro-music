import { Playlist } from "src/models/music";
import { ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import style from "./style.module.scss";
import AreaHeader from "../AreaHeader";
import PlaylistItem from "../PlaylistItem";

interface Props {
  title?: string;
  playlists: Playlist[];
}

const PlaylistArea = ({ title = "默认歌单", playlists }: Props) => {
  function handleTapPlaylist(id: number) {
    Taro.navigateTo({
      url: `/pages/detail-songs/index?id=${id}&type=playlist`,
    });
  }

  return (
    <>
      <AreaHeader title={title} />
      <ScrollView scroll-x className={style.playlist} type='custom'>
        {playlists.map((item) => (
          <View key={item.id} className={style.playlistItem}>
            <PlaylistItem
              data={item}
              onTap={() => handleTapPlaylist(item.id)}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};
export default PlaylistArea;
