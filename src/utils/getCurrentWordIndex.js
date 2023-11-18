export const getCurrentWordIndex = (index, letters) => {
  let wordIndex = 0;
  let spaceCount = 0;

  for (let i = 0; i <= index; i++) {
    if (letters[i] === " ") {
      spaceCount += 1;
    } else {
      wordIndex = spaceCount + 1;
    }
  }

  return wordIndex;
};
