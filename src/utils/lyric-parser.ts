/**
 * @example `[00:00.000] 作词 : 许嵩 -> { time: 0, content: '作词 : 许嵩' }`
 * @param lyricStr 歌词
 * @returns 解析好的数组
 */
export function parseLyric(lyricStr: string) {
  const results: Array<{ time: number; content: string }> = [];

  // 1. 根据 \n 分割字符串
  const lyricList = lyricStr.split(/\n/);

  // 2. 针对每一行歌词进行解析
  const timeReg =
    /\[(?<minute>\d{2}):(?<second>\d{2})\.(?<millisecond>\d{2,3})\](?<content>.*)/;
  for (const line of lyricList) {
    if (line) {
      const { minute, second, millisecond, content } =
        line.match(timeReg)!.groups!;
      const minuteTime = +minute * 60 * 1000;
      const secondTime = +second * 1000;
      const mSecondTime =
        millisecond.length === 3 ? +millisecond * 1 : +millisecond * 10;
      const time = minuteTime + secondTime + mSecondTime;

      results.push({
        time,
        content: content.trim(),
      });
    }
  }
  return results;
}
