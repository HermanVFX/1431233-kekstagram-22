// Функция debounce взята с ресурса https://learn.javascript.ru/task/debounce
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
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
