import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { useCallback, useEffect, useState } from "react";
import { Banner, Playlist, PlaylistDetail, Track } from "src/models/music";
import { getBanners, getPlaylists } from "src/service/api-music";
import queryRect from "src/utils/query-rect";
import throttle from "src/utils/throttle";
import { fetchRankingDataAction } from "src/store/features/ranking";
import { AtSearchBar } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import AreaHeader from "src/components/AreaHeader";
import SongItemV1 from "src/components/SongItemV1";
import PlaylistArea from "src/components/PlaylistArea";
import RankingItem from "src/components/RankingItem";
import "./index.scss";

const MainMusic = () => {
  function handleSearchTap() {
    console.log(123);
  }

  const _cb = useCallback(() => {}, []);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [hotPlaylists, setHotPlaylists] = useState<Playlist[]>([]);
  const [recommendPlaylists, setRecommendPlaylists] = useState<Playlist[]>([]);

  function loadData() {
    getBanners().then((res) => {
      setBanners(res.banners);
    });
    getPlaylists().then((res) => {
      setHotPlaylists(res.playlists);
    });
    getPlaylists("华语").then((res) => {
      setRecommendPlaylists(res.playlists);
    });
  }

  const dispatch = useDispatch<AppDispatch>();

  const { rankings, recommendSongs } = useSelector<
    RootState,
    { rankings: PlaylistDetail[]; recommendSongs: Track[] }
  >((state) => {
    const { newRanking, hotRanking, originalRanking, riseRanking } =
      state.ranking;

    return {
      rankings: [newRanking, originalRanking, riseRanking],
      recommendSongs: hotRanking.tracks?.slice(0, 6) ?? [],
    };
  });

  useEffect(() => {
    loadData();
    dispatch(fetchRankingDataAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bannerHeight, setBannerHeight] = useState(0);

  const onImageLoad = throttle(function () {
    // 如何获取某个组件的高度？
    queryRect(".image").then((res) => {
      setBannerHeight(res[0].height);
    });
  }, 100);

  function handleTapRanking(id: number) {
    console.log(id)
  }

  return (
    <>
      {/* 搜索 */}
      <View onTap={handleSearchTap}>
        <AtSearchBar
          disabled
          placeholder='搜索您喜欢的歌曲...'
          value=''
          onChange={_cb}
        />
      </View>

      {/* 轮播图，高度和图片高度保持同步 */}
      <Swiper
        indicatorDots
        indicatorActiveColor='#fff'
        autoplay
        circular
        className='swiper'
        style={{ height: `${bannerHeight}px` }}
      >
        {banners.map((item) => (
          <SwiperItem key={item.adid} className='swiper-item'>
            <Image
              className='image'
              src={item.pic}
              mode='widthFix'
              onLoad={onImageLoad}
            />
          </SwiperItem>
        ))}
      </Swiper>

      {/* 歌曲推荐 */}
      <View className='recommend-song'>
        <AreaHeader title='歌曲推荐' />
        <View className='song-list'>
          {recommendSongs.map((item) => (
            <SongItemV1 key={item.id} data={item} />
          ))}
        </View>
      </View>

      {/* 热门歌单/推荐歌单 */}
      {hotPlaylists.length && (
        <PlaylistArea title='热门歌单' playlists={hotPlaylists} />
      )}
      {recommendPlaylists.length && (
        <PlaylistArea title='推荐歌单' playlists={recommendPlaylists} />
      )}

      {/* 巅峰榜 */}
      {rankings.length === 3 && (
        <View className='top'>
          <AreaHeader title='巅峰榜' showRight={false} />
          {rankings.map((item) => (
            <RankingItem key={item.id} data={item} onTap={() => handleTapRanking(item.id)} />
          ))}
        </View>
      )}
    </>
  );
};
export default MainMusic;
