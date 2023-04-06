import { Playlist } from "src/models/music";
import { ScrollView, View } from "@tarojs/components";
import style from "./style.module.scss";
import AreaHeader from "../AreaHeader";
import PlaylistItem from "../PlaylistItem";

interface Props {
  title?: string;
  playlists: Playlist[];
}

const PlaylistArea = ({ title = "默认歌单", playlists }: Props) => {
  function handleTapPlaylist(id: number) {
    console.log(id);
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
