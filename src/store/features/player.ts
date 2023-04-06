import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import { Song } from "src/models/player";
import { getSongDetail, getLyric } from "src/service/api-player";
import { parseLyric } from "src/utils/lyric-parser";
import { RootState } from "..";

export const audioCtx = Taro.createInnerAudioContext();

interface PlayerState {
  id: number;
  song: Song;
  duration: number;
  lyrics: { time: number; content: string }[];
  currentTime: number;
  currentLyric: string;
  currentLyricIndex: number;
  playModeIndex: number; // 0-列表循环，1-单曲循环，2-随机播放
  paused: boolean;
}

interface LyricItem {
  time: number;
  content: string;
}

const initialState: PlayerState = {
  id: 0,
  song: {} as Song,
  duration: 0,
  lyrics: [] as LyricItem[],

  currentTime: 0,
  currentLyric: '',
  currentLyricIndex: 0,

  playModeIndex: 0, // 0-列表循环，1-单曲循环，2-随机播放
  paused: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeId(state, { payload }) {
      state.id = payload;
    },
    changeSong(state, { payload }) {
      state.song = payload;
    },
    changeDuration(state, { payload }) {
      state.duration = payload;
    },
    changeLyrics(state, { payload }) {
      state.lyrics = payload;
    },
    changeCurrentTime(state, { payload }) {
      state.currentTime = payload;
    },
    changeCurrentLyric(state, { payload }) {
      state.currentLyric = payload;
    },
    changeCurrentLyricIndex(state, { payload }) {
      state.currentLyricIndex = payload;
    },
    changePlayModeIndex(state, { payload }) {
      state.playModeIndex = payload;
    },
    changePaused(state, { payload }) {
      state.paused = payload;
    },
  },
});

export const fetchSongAction = createAsyncThunk<
  void,
  number,
  { state: RootState }
>("player/fetchsongaction", async (id: number, { getState, dispatch }) => {
  let state = getState().player;
  if (id === state.id) return;
  dispatch(changeId(id));
  // 1. 请求数据
  const { songs } = await getSongDetail(id + "");
  dispatch(changeSong(songs[0]));
  dispatch(changeDuration(songs[0].dt));

  const { lrc } = await getLyric(id);
  dispatch(changeLyrics(parseLyric(lrc.lyric)));

  // 2. 播放歌曲
  audioCtx.stop();
  audioCtx.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  audioCtx.autoplay = true;

  // 3.监听 audioCtx 事件
  state = getState().player
  audioCtx.onCanplay(() => {
    audioCtx.play();
  });

  audioCtx.onTimeUpdate(() => {
    // 1.获取 currentTime
    const currentTime = audioCtx.currentTime * 1000;

    // 2.修改 currentTime
    dispatch(changeCurrentTime(currentTime));

    // 3.根据当前事件查找播放歌词
    const lyrics = state.lyrics;
    let i = 0;
    for (; i <= lyrics.length; i++) {
      if (i === lyrics.length) break;
      const lyricItem = lyrics[i];
      if (currentTime < lyricItem.time) {
        break;
      }
    }
    // 设置当前歌词的索引和内容
    const currentIndex = i - 1;
    if (state.currentLyricIndex !== currentIndex) {
      const currentLyric = state.lyrics[currentIndex];
      dispatch(changeCurrentLyric(currentLyric.content));
      dispatch(changeCurrentLyricIndex(currentIndex));
    }
  });
});

// 导出 actions
export const {
  changeId,
  changeSong,
  changeDuration,
  changeLyrics,
  changeCurrentTime,
  changeCurrentLyric,
  changeCurrentLyricIndex,
  changePlayModeIndex,
  changePaused,
} = playerSlice.actions;

// 导出 reducer
export default playerSlice.reducer;
