import { Lyric, Song } from "src/models/player";
import zbRequest from "./request";

/**
 * 请求歌曲详情
 * @param id 歌曲 id
 */
export function getSongDetail(ids: string) {
  return zbRequest.get<{ songs: Song[] }>("/song/detail", { ids });
}

/**
 * 获取歌词
 * @param id 歌曲 id
 */
export function getLyric(id: number) {
  return zbRequest.get<{ lrc: Lyric }>("/lyric", { id });
}
