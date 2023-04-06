export default function debounce(
  fn: Function,
  wait: number,
  immediate = false
) {
  let timer: null | NodeJS.Timer,
    invoked = false,
    result;

  const _debounced = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        if (timer) {
          clearTimeout(timer);
        }

        // 第一次操作不需要延迟
        if (immediate && !invoked) {
          invoked = true;
          result = fn.apply(this, args);
          return resolve(result);
        }

        timer = setTimeout(() => {
          result = fn.apply(this, args);
          resolve(result);
          timer = null;
          invoked = false;
        }, wait);
      } catch (error) {
        reject(error);
      }
    });
  };

  // 为 _debounced 绑定一个取消的函数
  _debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      invoked = false;
    }
  };

  return _debounced;
}
