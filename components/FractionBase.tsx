import React, { useState, useEffect } from "react";
import createFractionPair from "../utils/GenerateFraction";
import FractionButton from "./FractionButton";

interface Props {
  test?: string;
  onIncorrect: () => void;
}

type ReturnVoid = () => void;

const FractionBase: React.FC<Props> = ({ onIncorrect }) => {
  const [fraction1, setFraction1] = useState<number[]>([]);
  const [fraction2, setFraction2] = useState<number[]>([]);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
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
    onIncorrect();
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
    <div className="mb-24 flex flex-col flex-1 items-center justify-center">
      {wasCorrect && currentStreak > 0 && (
        <span className="text-green-500 font-bold text-2xl">
          Correct! x{currentStreak}
        </span>
      )}
      {wasCorrect === null && (
        <span className="font-bold text-2xl">Good Luck!</span>
      )}
      {/* {!wasCorrect && (
        <span className="text-red-500 font-bold text-2xl">Incorrect!</span>
      )} */}
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
  );
};

export default FractionBase;
