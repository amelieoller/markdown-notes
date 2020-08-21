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

export const sortByDate = (arr, attribute) => {
  return [...arr].sort(
    (a, b) =>
      (b[attribute] ? b[attribute].toDate() : new Date()) -
      (a[attribute] ? a[attribute].toDate() : new Date()),
  );
};

export const toCamelCase = (string) => {
  return string
    .trim()
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
};
