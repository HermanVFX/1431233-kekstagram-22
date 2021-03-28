// Функция debounce взята с ресурса https://learn.javascript.ru/task/debounce
function debounce(f, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) {
      return;
    }
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
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
