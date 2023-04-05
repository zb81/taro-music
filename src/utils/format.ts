export function formatCount(count: number) {
  var Y = Math.pow(10, 8);
  var W = Math.pow(10, 4);
  if (count >= Y) {
    return (count / Y).toFixed(1) + "亿";
  }
  if (count > W) {
    return (count / W).toFixed(1) + "万";
  }
  return count + "";
}

function padLeftZero(n: number) {
  return ("00" + n).slice((n + "").length);
}

export function formatDuration(duration: number) {
  duration = Math.floor(duration / 1000);
  var m = padLeftZero(Math.floor(duration / 60));
  var s = padLeftZero(duration % 60);
  return m + ":" + s;
}
