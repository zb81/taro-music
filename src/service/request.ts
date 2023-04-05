import { request } from "@tarojs/taro";
import { BASE_URL, TIMEOUT } from "./config";

class ZBRequest {
  request<R, P = any>(url: string, method: "GET" | "POST", params: P) {
    return new Promise<R>((resolve, reject) => {
      request({
        url: BASE_URL + url,
        timeout: TIMEOUT,
        method: method,
        data: params,
        success: (res) => resolve(res.data),
        fail: reject,
      });
    });
  }

  post<R, P = any>(url: string, params: P) {
    return this.request<R, P>(url, "POST", params);
  }

  get<R, P = any>(url: string, params: P) {
    return this.request<R, P>(url, "GET", params);
  }
}

export default new ZBRequest();
