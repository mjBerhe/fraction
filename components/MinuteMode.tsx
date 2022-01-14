import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import FractionBase from "./FractionBase";

interface Props {
  resetMode?: () => void;
  start?: boolean;
}

const oneMinute = new Date();
oneMinute.setSeconds(oneMinute.getSeconds() + 60);

const MinuteMode: React.FC<Props> = ({ resetMode }) => {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: oneMinute,
    autoStart: false,
    onExpire: () => console.log("Timer done"),
  });

  useEffect(() => {
    if (gameRunning) {
      // start();
      const time = new Date();
      time.setSeconds(time.getSeconds() + 60);
      restart(time, true);
    }
  }, [gameRunning]);

  const startGame = () => {
    setTryAgain(false);
    setGameRunning(true);
  };

  const onIncorrect = () => {
    setGameRunning(false);
    setTryAgain(true);
    console.log("finish game");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <button onClick={resetMode} className="p-2">
          Home
        </button>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center">
        {!gameRunning && !tryAgain && (
          <div className="flex flex-col flex-1 items-center space-y-8 mb-16">
            <div className="flex flex-col mt-20 p-4 border-2 border-white w-96">
              <span className="text-xl font-bold mb-4">RULES</span>
              <span className="text-lg">1. Select the larger fraction</span>
              <span className="text-lg">2. Be fast</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <button
                type="button"
                onClick={startGame}
                className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80"
              >
                PLAY
              </button>
            </div>
          </div>
        )}
        {gameRunning && (
          <div className="flex flex-col flex-1 w-full">
            <div className="flex justify-center mt-12 text-5xl">
              {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <FractionBase onIncorrect={onIncorrect} />
          </div>
        )}
        {tryAgain && (
          <div className="flex flex-col items-center">
            <span className="font-bold text-red-500 text-7xl sm:text-8xl">
              WRONG
            </span>
            <span className="mt-2 text-base">Do better next time</span>
            <div className="mt-24">
              <button
                type="button"
                onClick={startGame}
                className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinuteMode;
