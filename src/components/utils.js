export const addOrRemoveFromArr = (arr, id) => {
  let newArr;

  if (arr.includes(id)) {
    newArr = arr.filter((tag) => tag !== id);
  } else {
    newArr = [...arr, id];
  }

  return newArr;
};

export const getTitle = (content) => {
  return content.split('\n')[0].replace('#', '').trim();
};
