import { MVDetail, MVURL, RelatedVideo, VideoRoot } from "../models/video";
import zbRequest from "./request";

/**
 * 获取推荐 MV
 * @param offset 偏移量
 * @param limit 每页条数，默认 10
 */
export function getTopMV(offset: number, limit = 10) {
  return zbRequest.get<{ data: VideoRoot[]; hasMore: boolean }>("/top/mv", {
    offset,
    limit,
  });
}

/**
 * 请求 MV 播放地址
 * @param id MV id
 */
export function getMVURL(id: number) {
  return zbRequest.get<{ data: MVURL }>("/mv/url", { id });
}

/**
 * 请求 MV 详情
 * @param id MV id
 */
export function getMVDetail(mvid: number) {
  return zbRequest.get<{ data: MVDetail }>("/mv/detail", { mvid });
}

/**
 * 请求相关 MV
 * @param id MV id
 */
export function getRelatedMV(mvid: number) {
  return zbRequest.get<{ mvs: RelatedVideo[] }>("/simi/mv", { mvid });
}
