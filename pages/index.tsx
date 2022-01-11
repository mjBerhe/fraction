import { useState } from "react";
import type { NextPage } from "next";

import FractionButton from "../components/FractionButton";

type Difficulty = "easy" | "hard";
const getRandomInt = (max: number) => {
  const randomInt = Math.ceil(Math.random() * max);
  return randomInt;
};

const createFractionPair = (difficulty: Difficulty): number[][] => {
  let d1!: number;
  if (difficulty === "easy") {
    // denominator of 2-12
    d1 = getRandomInt(11) + 1;
    const n1 = getRandomInt(d1 - 1);

    let d2 = d1;
    while (d2 === d1) {
      d2 = getRandomInt(11) + 1;
    }
    const n2 = getRandomInt(d2 - 1);

    return [
      [n1, d1],
      [n2, d2],
    ];
  }
  return [[]];
};

const Home: NextPage = () => {
  const [fraction1, setFraction1] = useState<number[]>([]);
  const [fraction2, setFraction2] = useState<number[]>([]);
  const [wasCorrect, setWasCorrect] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const setFractions = (): void => {
    const [f1, f2] = createFractionPair("easy");
    setFraction1(f1);
    setFraction2(f2);
  };

  const isCorrect = () => {
    setCurrentStreak((prev) => prev + 1);
    setWasCorrect(true);
  };

  const isIncorrect = () => {
    setCurrentStreak(0);
    setWasCorrect(false);
  };

  const submitAnswer = (answer: number[]) => {
    console.log(answer);
    if (answer === fraction1) {
      if (fraction1[0] / fraction1[1] > fraction2[0] / fraction2[1]) {
        console.log("correct!");
        isCorrect();
      } else {
        console.log("incorrect!");
        isIncorrect();
      }
    }
    if (answer === fraction2) {
      if (fraction2[0] / fraction2[1] > fraction1[0] / fraction1[1]) {
        console.log("correct!");
        isCorrect();
      } else {
        console.log("incorrect!");
        isIncorrect();
      }
    }

    setFractions();
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <button onClick={() => setFractions()}>Get Fractions</button>
        <div className="flex w-full justify-center space-x-12 p-12">
          {fraction1?.length > 0 && (
            <FractionButton handleClick={submitAnswer} fraction={fraction1} />
          )}
          {fraction2?.length > 0 && (
            <FractionButton handleClick={submitAnswer} fraction={fraction2} />
          )}
        </div>
        {wasCorrect && currentStreak > 0 && (
          <span>Correct! x{currentStreak}</span>
        )}
        {!wasCorrect && <span>Incorrect!</span>}
      </div>
    </div>
  );
};

export default Home;
