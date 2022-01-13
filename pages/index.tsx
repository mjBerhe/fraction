import { useState, useEffect } from "react";
import type { NextPage } from "next";

import FractionButton from "../components/FractionButton";
import MinuteMode from "../components/MinuteMode";

type Modes = "MinuteMode" | "Test" | null;
type Difficulty = "easy" | "hard";
type ReturnVoid = () => void;

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

const Home: NextPage = () => {
  const [mode, setMode] = useState<Modes>(null);

  const resetMode = () => {
    setMode(null);
  };

  const [fraction1, setFraction1] = useState<number[]>([]);
  const [fraction2, setFraction2] = useState<number[]>([]);
  const [wasCorrect, setWasCorrect] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const setFractions: ReturnVoid = () => {
    const [f1, f2] = createFractionPair("easy");
    setFraction1(f1);
    setFraction2(f2);
  };

  const isCorrect: ReturnVoid = () => {
    setCurrentStreak((prev) => prev + 1);
    setWasCorrect(true);
  };

  const isIncorrect: ReturnVoid = () => {
    setCurrentStreak(0);
    setWasCorrect(false);
  };

  const submitAnswer = (answer: number[]) => {
    // console.log(answer);
    if (answer === fraction1) {
      if (fraction1[0] / fraction1[1] > fraction2[0] / fraction2[1]) {
        console.log(
          `Correct! ${fraction1[0]}/${fraction1[1]} > ${fraction2[0]}/${fraction2[1]}`
        );
        isCorrect();
      } else {
        console.log(
          `Incorrect! ${fraction1[0]}/${fraction1[1]} < ${fraction2[0]}/${fraction2[1]}`
        );
        isIncorrect();
      }
    }
    if (answer === fraction2) {
      if (fraction2[0] / fraction2[1] > fraction1[0] / fraction1[1]) {
        console.log(
          `Correct! ${fraction2[0]}/${fraction2[1]} > ${fraction1[0]}/${fraction1[1]}`
        );
        isCorrect();
      } else {
        console.log(
          `Incorrect! ${fraction2[0]}/${fraction2[1]} < ${fraction1[0]}/${fraction1[1]}`
        );
        isIncorrect();
      }
    }

    setFractions();
  };

  useEffect(() => {
    setFractions();
  }, []);

  return (
    <div className="min-h-screen">
      {!mode && (
        <div className="flex flex-col h-screen items-center justify-center">
          {/* <h1 className="text-3xl font-bold mb-24">Fraction</h1> */}
          <div className="flex flex-col">
            <div>
              <button
                type="button"
                onClick={() => setMode("MinuteMode")}
                className="border border-white py-2 px-4 rounded-lg shadow"
              >
                Speed Test
              </button>
            </div>
          </div>
        </div>
      )}
      {mode === "MinuteMode" && <MinuteMode resetMode={resetMode} />}
      {mode === "Test" && (
        <div className="flex flex-col h-screen items-center justify-center">
          {wasCorrect && currentStreak > 0 && (
            <span className="text-green-500 font-bold text-2xl">
              Correct! x{currentStreak}
            </span>
          )}
          {!wasCorrect && (
            <span className="text-red-600 font-bold text-2xl">Incorrect!</span>
          )}
          <div className="flex w-full justify-center items-center space-x-8 h-56">
            {fraction1?.length > 0 && (
              <FractionButton
                handleClick={submitAnswer}
                fraction={fraction1}
                triggerKey="ArrowLeft"
              />
            )}
            <span className="font-bold text-xl">OR</span>
            {fraction2?.length > 0 && (
              <FractionButton
                handleClick={submitAnswer}
                fraction={fraction2}
                triggerKey="ArrowRight"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
