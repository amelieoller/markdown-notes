import { NoteDates } from '../interfaces/noteInterface';
import { Tag } from '../interfaces/tagInterface';

export const addOrRemoveFromArr = (arr: string[], id: string) => {
  let newArr;

  if (arr.includes(id)) {
    newArr = arr.filter((tag: string) => tag !== id);
  } else {
    newArr = [...arr, id];
  }

  return newArr;
};

export const getTitle = (content: string) => {
  return content.split('\n')[0].replace('#', '').trim();
};

export const sortTagsByAttribute = (arr: Tag[], attribute: keyof Tag) => {
  return [...arr].sort((a, b) => {
    let nameA = a[attribute].toUpperCase();
    let nameB = b[attribute].toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const sortNotesByDate = (arr: NoteDates[], attribute: keyof NoteDates) => {
  return [...arr].sort((a, b) => {
    const dateA = a[attribute].toDate();
    const dateB = b[attribute].toDate();
    const today = new Date();

    return (b[attribute] ? dateB : today) - (a[attribute] ? dateA : today);
  });
};

export const toCamelCase = (string: string) => {
  return string
    .trim()
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
};
