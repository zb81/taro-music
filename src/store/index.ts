import { configureStore } from "@reduxjs/toolkit";
import rankingReducer from "./features/ranking";
import playerReducer from "./features/player";

const store = configureStore({
  reducer: {
    ranking: rankingReducer,
    player: playerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
