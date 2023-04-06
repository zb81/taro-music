import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Slider,
  ScrollView,
} from "@tarojs/components";
import NavigationBar from "src/components/NavigationBar";
import { useContext, useEffect, useRef, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { GlobalContext } from "src/context";
import queryRect from "src/utils/query-rect";
import { formatDuration } from "src/utils/format";
import {
  audioCtx,
  changeCurrentTime,
  changePlayModeIndex,
} from "src/store/features/player";
import "./index.scss";

const playModeNames = ["order", "repeat", "random"];

const MusicPlayer = () => {
  const {
    song,
    currentLyric,
    currentTime,
    duration,
    currentLyricIndex,
    playModeIndex,
    lyrics,
  } = useSelector<RootState, RootState["player"]>((state) => state.player);

  const [currentTab, setCurrentTab] = useState(0);

  const titleChild = (
    <View className='tab'>
      <View className={currentTab === 0 ? "active" : ""}>歌曲</View>
      <View className='divider'>丨</View>
      <View className={currentTab === 1 ? "active" : ""}>歌词</View>
    </View>
  );

  const [contentHeight, setContentHeight] = useState(0);
  const { screenHeight } = useContext(GlobalContext);

  useLoad(() => {
    // 计算内容高度
    setTimeout(() => {
      queryRect(".nav").then((res) => {
        setContentHeight(screenHeight - res[0].height);
      });
    }, 500);
  });

  const [sliderValue, setSliderValue] = useState(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState(0);
  const [lyricScrollTop, setLyricScrollTop] = useState(0);
  const [playModeName, setPlayModeName] = useState("order");
  const isSliderChanging = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  function onSliderChange(e) {
    // 1. 获取 slider 最新值
    const value = e.detail.value;
    // 2. 计算需要播放的 time
    const _currentTime = (duration * value) / 100;
    // 3. 设置 ctx
    audioCtx.pause();
    audioCtx.seek(_currentTime / 1000);
    // 4. 记录最新的 sliderValue
    setSliderValue(value);
    dispatch(changeCurrentTime(_currentTime));
    isSliderChanging.current = false;
  }
  function onSliderChanging(e) {
    const value = e.detail.value;
    setSliderValue(value);
    const _currentTime = (duration * value) / 100;
    setCurrentTimeDisplay(_currentTime);
    isSliderChanging.current = true;
  }

  useEffect(() => {
    if (currentTime && !isSliderChanging.current) {
      const _sliderValue = (currentTime / duration) * 100;
      setSliderValue(_sliderValue);
      setCurrentTimeDisplay(currentTime);
    }
  }, [currentTime, duration]);
  useEffect(() => {
    if (currentLyricIndex) {
      setLyricScrollTop(currentLyricIndex * 35);
    }
  }, [currentLyricIndex]);
  useEffect(() => {
    setPlayModeName(playModeNames[playModeIndex]);
  }, [playModeIndex]);

  function onClickMode() {
    dispatch(changePlayModeIndex((playModeIndex + 1) % 3));
  }

  return (
    song.id && (
      <>
        {/* 背景 */}
        <Image src={song.al.picUrl} mode='aspectFill' className='bg-image' />
        <View className='bg-cover'></View>

        {/* 导航 */}
        <View className='nav'>
          <NavigationBar
            titleChild={titleChild}
            onTapLeft={() => Taro.navigateBack()}
          />
        </View>

        {/* 内容 */}
        <Swiper
          className='content'
          style={{ height: `${contentHeight}px` }}
          onChange={(e) => setCurrentTab(e.detail.current)}
        >
          {/* 歌曲 */}
          <SwiperItem className='music'>
            <View className='album'>
              <Image src={song.al.picUrl} mode='widthFix' className='image' />
            </View>
            <View className='info'>
              <View className='name'>{song.name}</View>
              <View className='origin'>
                <View>{song.ar[0].name}</View>
                <View className='album-name'>专辑：{song.al.name}</View>
              </View>
            </View>
            <View className='line-lyric'>{currentLyric}</View>
            <View className='progress'>
              <Slider
                className='slider'
                block-size='{{12}}'
                value={sliderValue}
                onChange={onSliderChange}
                onChanging={onSliderChanging}
              />
              <View className='time'>
                <View className='current'>
                  {formatDuration(currentTimeDisplay)}
                </View>
                <View className='duration'>{formatDuration(duration)}</View>
              </View>
            </View>
            <View className='controller'>
              <Image
                className='btn mode'
                src={`/assets/images/player/play_${playModeName}.png`}
                onTap={onClickMode}
              />

              <Image
                className='btn prev'
                src='/assets/images/player/play_prev.png'
              />
              <Image
                className='btn pause'
                src='/assets/images/player/play_pause.png'
              />
              <Image
                className='btn next'
                src='/assets/images/player/play_next.png'
              />
              <Image
                className='btn order'
                src='/assets/images/player/play_music.png'
              />
            </View>
          </SwiperItem>

          {/* 歌词 */}
          <SwiperItem className='lyric'>
            <ScrollView
              className='lyric-list'
              scrollY
              scrollTop={lyricScrollTop}
              scrollWithAnimation
              type='custom'
            >
              {lyrics.map((item, idx) => (
                <View
                  key={idx}
                  className={`item ${
                    currentLyricIndex === idx ? "active" : ""
                  }`}
                  style={{
                    paddingTop: `${idx === 0 ? contentHeight / 2 - 80 : "0"}px`,
                    paddingBottom: `${
                      idx === lyrics.length - 1 ? contentHeight / 2 + 80 : "0"
                    }px`,
                  }}
                >
                  {item.content}
                </View>
              ))}
            </ScrollView>
          </SwiperItem>
        </Swiper>
      </>
    )
  );
};
export default MusicPlayer;
