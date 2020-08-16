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

export const sortByString = (arr, attribute) => {
  return [...arr].sort((a, b) => {
    let nameA = a[attribute].toUpperCase();
    let nameB = b[attribute].toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};
