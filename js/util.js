// Функция debounce взята с ресурса https://learn.javascript.ru/task/debounce
function debounce(fn, interval) {
  let timer;
  return function debounced() {
    clearTimeout(timer);
    let args = arguments;
    let that = this;
    timer = setTimeout(function callOriginalFn() {
      fn.apply(that, args);
    }, interval);
  };
}
// Подсчет коментариев для сортировки
const getCommentsAmount = function (photo) {
  return photo.comments.length;
};
// Сравнение
const sortCommentDescend = function (pictureA, pictureB) {
  return getCommentsAmount(pictureB) - getCommentsAmount(pictureA);
};

export {debounce, sortCommentDescend}
