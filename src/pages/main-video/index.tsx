import Taro, { useLoad, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { useCallback, useState } from "react";
import { VideoRoot } from "src/models/video";
import { getTopMV } from "src/service/api-video";
import VideoItem from "./cpns/VideoItem";
import "./style.scss";

const MainVideo = () => {
  const [videos, setVideos] = useState<VideoRoot[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // 网络请求方法
  const loadData = useCallback(
    async (fresh = true) => {
      if (fresh) {
        setHasMore(true);
      }

      if (!hasMore) return;

      const res = await getTopMV(fresh ? 0 : videos.length);
      setVideos(fresh ? res.data : [...videos, ...res.data]);
      setHasMore(res.hasMore);
      if (fresh) {
        Taro.stopPullDownRefresh();
      }
    },
    [videos, hasMore]
  );

  useLoad(() => {
    loadData(true)
  })

  useReachBottom(() => {
    loadData(false)
  });

  usePullDownRefresh(() => {
    loadData(true)
  });

  return videos.map((item) => <VideoItem key={item.id} data={item} />);
};
export default MainVideo;
