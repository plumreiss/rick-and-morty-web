export const getNumberRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
