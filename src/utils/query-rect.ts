import Taro from "@tarojs/taro";

/**
 * 查询某个组件
 * @param selector 组件选择器
 */
export default function queryRect<T = any>(selector: string) {
  return new Promise<T>((resolve) => {
    const query = Taro.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(resolve);
  });
}
