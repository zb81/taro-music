export default function throttle(
  fn: Function,
  interval: number,
  { leading = true, trailing = false } = {}
) {
  let start = 0,
    timer: null | NodeJS.Timer;

  const _throttled = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        const now = Date.now();

        if (!leading && start === 0) {
          start = now;
        }

        const wait = interval - (now - start);
        if (wait <= 0) {
          if (timer) {
            clearTimeout(timer);
          }
          const result = fn.apply(this, args);
          resolve(result);
          start = now;
          timer = null;
          return;
        }

        // 判断是否需要执行尾部
        if (trailing && !timer) {
          timer = setTimeout(() => {
            const result = fn.apply(this, args);
            resolve(result);
            start = Date.now();
            timer = null;
          }, wait);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  _throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    start = 0;
    timer = null;
  };

  return _throttled;
}
