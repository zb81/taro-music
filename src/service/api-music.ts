import { Banner, Playlist, PlaylistDetail } from "src/models/music";
import zbRequest from "./request";

/**
 * 请求轮播图数据
 */
export function getBanners() {
  return zbRequest.get<{ banners: Banner[] }>("/banner", { type: 2 });
}

/**
 * 请求歌单数据
 * @param idx 热门类别
 */
export function getPlaylist(id: number) {
  return zbRequest.get<{playlist: PlaylistDetail}>("/playlist/detail", { id });
}

/**
 * 请求歌单列表
 * @param cat
 * @param limit
 * @param offset
 */
export function getPlaylists(cat = "全部", limit = 6, offset = 0) {
  return zbRequest.get<{playlists: Playlist[]}>("/top/playlist", { cat, limit, offset });
}
