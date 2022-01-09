import { useState } from "react";
import type { NextPage } from "next";

type Difficulty = "easy" | "hard";

const Home: NextPage = () => {
  const getRandomInt = (max: number) => {
    const randomInt = Math.ceil(Math.random() * max);
    return randomInt;
  };

  const createFraction = (difficulty: Difficulty) => {
    let denominator!: number;
    if (difficulty === "easy") {
      // denominator of 2-12
      denominator = getRandomInt(11) + 1;
    }
    const numerator = getRandomInt(denominator - 1);
    console.log([numerator, denominator]);
    return [numerator, denominator];
  };

  const [fraction1, setFraction1] = useState<number[]>([]);
  const [fraction2, setFraction2] = useState<number[]>([]);

  const setFractions = () => {
    const f1 = createFraction("easy");
    const f2 = createFraction("easy");
    setFraction1(f1);
    setFraction2(f2);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <button onClick={() => setFractions()}>Get Fractions</button>
        <div className="flex w-full justify-center space-x-24 p-12">
          {fraction1?.length > 0 && (
            <div>
              {fraction1[0]} / {fraction1[1]}
            </div>
          )}
          {fraction2?.length > 0 && (
            <div>
              {fraction2[0]} / {fraction2[1]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
