import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { PlaylistDetail } from "src/models/music";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import AreaHeader from "src/components/AreaHeader";
import PlaylistDetailHeader from "src/components/PlaylistDetailHeader";
import SongItemV2 from "src/components/SongItemV2";
import { getPlaylist } from "src/service/api-music";
import "./index.scss";

const DetailSongs = () => {
  const [detailType, setDetailType] = useState("");
  const [rankingName, setRankingName] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistDetail>();

  const { rankings } = useSelector<RootState, { rankings: PlaylistDetail[] }>(
    (state) => {
      const { newRanking, hotRanking, originalRanking, riseRanking } =
        state.ranking;

      return {
        rankings: [hotRanking, newRanking, originalRanking, riseRanking],
      };
    }
  );

  useEffect(() => {
    if (!rankings[0].id || !detailType || detailType === "playlist") return;

    switch (rankingName) {
      case "hotRanking":
        setPlaylistInfo(rankings[0]);
        break;
      case "newRanking":
        setPlaylistInfo(rankings[1]);
        break;
      case "originalRanking":
        setPlaylistInfo(rankings[2]);
        break;
      case "riseRanking":
        setPlaylistInfo(rankings[3]);
        break;
    }
  }, [rankingName, rankings, detailType]);

  useLoad(({ type, ranking, id }) => {
    setDetailType(type);
    setRankingName(ranking);
    if (type === "playlist") {
      getPlaylist(id).then((res) => {
        setPlaylistInfo(res.playlist);
      });
    }
  });
  return (
    playlistInfo && (
      <>
        {detailType === "ranking" && <AreaHeader title={playlistInfo.name} showRight={false} />}
        {detailType === "playlist" && (
          <PlaylistDetailHeader playlistInfo={playlistInfo} />
        )}
        <View className='song-list'>
          {playlistInfo.tracks.map((item, idx) => (
            <SongItemV2 key={item.id} index={idx} item={item} />
          ))}
        </View>
      </>
    )
  );
};
export default DetailSongs;
