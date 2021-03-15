const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const HASHTAGS_MAX_COUNT = 5;
const COMMENTS_MAX = 140;
const HASHTAG_REG_EXP = /^#([а-яА-Я]|[a-zA-Z]|[0-9]){1,20}$/;

const UserMessage = {
  LESS_THEN_FIVE: 'Нельзя указать больше пяти хэш-тегов',
  NO_DUPLICATES: 'Один и тот же хэш-тег не может быть использован дважды',
  CORRECT: 'Не верный формат хештега',
};

const hashtagsInputHandler = function (evt) {
  const { target: hashTagsField } = evt;
  const hashtagsArr = hashTagsField.value
    .replace(/ +/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ');

  const isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

  const isHashtagCorrect = hashtagsArr.every((tag) => {
    return HASHTAG_REG_EXP.test(tag);
  });

  const isHastagsNoDuplicates = hashtagsArr.every((item, index, hashtags) => {
    return hashtags.indexOf(item) === index;
  });

  hashTagsField.setCustomValidity('');

  if (!isHashtagsLessThanFive) {
    hashTagsField.setCustomValidity(UserMessage.LESS_THEN_FIVE);
  }

  if (!isHashtagCorrect) {
    hashTagsField.setCustomValidity(UserMessage.CORRECT);
  }

  if (!isHastagsNoDuplicates) {
    hashTagsField.setCustomValidity(UserMessage.NO_DUPLICATES);
  }
  hashTagsField.reportValidity();

  if (hashTagsField.value === '') {
    hashTagsField.setCustomValidity('');
  }

  if (
    (isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive) ||
    hashTagsField.value === ''
  ) {
    hashTagsField.style.outline = '';
    hashTagsField.style.background = '';
  } else {
    hashTagsField.style.outline = '2px solid red';
    hashTagsField.style.background = 'pink';
  }
};

const commentsInputHandler = function (evt) {
  const { target: commentsField } = evt;
  const valueLength = commentsField.value.length;
  if (commentsField.value.length > COMMENTS_MAX) {
    commentsField.setCustomValidity('Удалите ' + (COMMENTS_MAX - valueLength) + ' симв.');
    commentsField.style.outline = '2px solid red';
    commentsField.style.background = 'pink';
  } else {
    commentsField.setCustomValidity('');
    commentsField.style.outline = 'none';
    commentsField.style.background = 'white';
  }
  commentsField.reportValidity();
};

const validation = function () {
  hashTagsField.addEventListener('input', hashtagsInputHandler);
  textDescription.addEventListener('input', commentsInputHandler);
};




export {validation};
