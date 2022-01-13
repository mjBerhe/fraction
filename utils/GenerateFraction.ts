type Difficulty = "easy" | "hard";

const getRandomInt = (max: number) => {
  const randomInt = Math.ceil(Math.random() * max);
  return randomInt;
};

const createFractionPair = (difficulty: Difficulty): number[][] => {
  let d1!: number;
  if (difficulty === "easy") {
    // denominator of 3-12
    d1 = getRandomInt(10) + 2;
    const n1 = getRandomInt(d1 - 1);

    let n2 = n1;
    let d2 = d1;
    while (n1 / d1 === n2 / d2) {
      while (d2 === d1) {
        d2 = getRandomInt(10) + 2;
      }
      n2 = getRandomInt(d2 - 1);
    }

    return [
      [n1, d1],
      [n2, d2],
    ];
  }
  return [[]];
};

export default createFractionPair;
