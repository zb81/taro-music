import { Video, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { MVDetail, RelatedVideo } from "src/models/video";
import { getMVURL, getMVDetail, getRelatedMV } from "src/service/api-video";
import { formatCount } from "src/utils/format";
import { AppDispatch } from "src/store";
import { useDispatch } from "react-redux";
import { changePaused } from "src/store/features/player";
import "./index.scss";
import DetailVideoItem from "./cpns/DetailVideoItem";

const DetailVideo = () => {
  const [mvUrl, setMvUrl] = useState("");
  const [mvId, setMvId] = useState<number>();
  const [mvDetail, setMvDetail] = useState<MVDetail>({} as MVDetail);
  const [relatedMV, setRelatedMV] = useState<RelatedVideo[]>([]);

  async function loadMVURL(id: number) {
    const { data } = await getMVURL(id);
    setMvUrl(data.url);
  }
  async function loadMVDetail(id: number) {
    const { data } = await getMVDetail(id);
    setMvDetail(data);
  }
  async function loadRelatedMV(id: number) {
    const { mvs } = await getRelatedMV(id);
    setRelatedMV(mvs);
  }

  function loadData(id: number) {
    try {
      loadMVURL(id);
      loadMVDetail(id);
      loadRelatedMV(id);
    } catch {
      Taro.showToast({
        title: "请求失败，请稍后重试",
        icon: "error",
        duration: 2000,
      });
    }
  }

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(changePaused());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mvId) {
      loadData(+mvId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mvId]);

  useLoad(({ id }) => {
    setMvId(id);
  });

  return (
    <>
      <Video className='video' src={mvUrl} autoplay referrerPolicy='origin' />
      <View className='lower'>
        <View className='title'>
          {mvDetail.name} - {mvDetail.artistName}
        </View>
        <View className='info'>
          {formatCount(mvDetail.playCount)}次播放 - {mvDetail.publishTime}
        </View>
        <View className='header'>推荐视频</View>
        {relatedMV.map((item) => (
          <DetailVideoItem
            key={item.id}
            data={item}
            onTap={() => setMvId(item.id)}
          />
        ))}
      </View>
    </>
  );
};
export default DetailVideo;
