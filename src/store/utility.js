export const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps
  };
};

export const dingCheck = (xp) => {
  let level = 1;

  console.log(xp);

  switch (xp > 0) {
    case xp > 499:
      level = 9;
      break;
    case xp > 419:
      level = 8;
      break;
    case xp > 324:
      level = 7;
      break;
    case xp > 274:
      level = 6;
      break;
    case xp > 209:
      level = 5;
      break;
    case xp > 149:
      level = 4;
      break;
    case xp > 94:
      level = 3;
      break;
    case xp > 44:
      level = 2;
      break;
    default:
      level = 1;
  }

  return level;
}