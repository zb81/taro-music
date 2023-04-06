import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlaylistDetail } from "src/models/music";
import { getPlaylist } from "src/service/api-music";

export const fetchRankingDataAction = createAsyncThunk(
  "ranking/fetchrankingdata",
  (_, { dispatch }) => {
    /*
      热歌榜: 3778678
      新歌榜: 3779629
      原创榜: 2884035
      飙升榜: 19723756
    */
    getPlaylist(3778678).then((res) =>
      dispatch(changeHotRanking(res.playlist))
    );
    getPlaylist(3779629).then((res) =>
      dispatch(changeNewRanking(res.playlist))
    );
    getPlaylist(2884035).then((res) =>
      dispatch(changeOriginalRanking(res.playlist))
    );
    getPlaylist(19723756).then((res) =>
      dispatch(changeRiseRanking(res.playlist))
    );
  }
);

const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    hotRanking: {} as PlaylistDetail,
    newRanking: {} as PlaylistDetail,
    originalRanking: {} as PlaylistDetail,
    riseRanking: {} as PlaylistDetail,
  },
  reducers: {
    changeHotRanking(state, { payload }) {
      state.hotRanking = payload;
    },
    changeNewRanking(state, { payload }) {
      state.newRanking = payload;
    },
    changeOriginalRanking(state, { payload }) {
      state.originalRanking = payload;
    },
    changeRiseRanking(state, { payload }) {
      state.riseRanking = payload;
    },
  },
});

// 导出 actions
export const {
  changeHotRanking,
  changeNewRanking,
  changeOriginalRanking,
  changeRiseRanking,
} = rankingSlice.actions;

// 导出 reducer
export default rankingSlice.reducer;
