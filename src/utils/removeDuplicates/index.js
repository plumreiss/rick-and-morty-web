export const removeDuplicates = (arr) =>
  arr.filter((value, index) => arr.indexOf(value) === index);
