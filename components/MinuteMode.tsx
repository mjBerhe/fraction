import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const [username, setUsername] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const router = useRouter();

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: oneMinute,
      autoStart: false,
      onExpire: () => finishGame(),
    });

  useEffect(() => {
    if (gameRunning) {
      // start();
      const time = new Date();
      time.setSeconds(time.getSeconds() + 10);
      restart(time, true);
    }
  }, [gameRunning]);

  const startGame = () => {
    setCurrentStreak(0);
    setTryAgain(false);
    setGameCompleted(false);
    setGameRunning(true);
  };

  const finishGame = () => {
    setGameRunning(false);
    setTryAgain(false);
    setGameCompleted(true);
  };

  const onIncorrect = () => {
    pause();
    setGameRunning(false);
    setTryAgain(true);
  };

  const onCorrect = () => {
    setCurrentStreak((prev) => prev + 1);
  };

  const submitScore = async () => {
    try {
      if (username !== "") {
        const test = await fetch("/api/submitScore", {
          body: JSON.stringify({
            username: username,
            gameMode: "SpeedTest",
            score: currentStreak,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(test);
        if (test.ok) {
          console.log("going to highscores");
          router.push("/highscores");
        }
      } else {
        setNameError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-4 space-x-6">
        <button onClick={resetMode} className="">
          Home
        </button>
        <Link href="/highscores">Highscores</Link>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center">
        {!gameRunning && !tryAgain && !gameCompleted && (
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
            <FractionBase onCorrect={onCorrect} onIncorrect={onIncorrect} />
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
        {gameCompleted && (
          <div className="flex flex-col items-center">
            <span className="font-bold text-green-500 text-7xl sm:text-8xl">
              DONE
            </span>
            <span className="mt-2 text-2xl">
              You got{" "}
              <strong className="text-green-500">{currentStreak}</strong>{" "}
              answers correct
            </span>
            <div className="flex flex-col space-y-4 mt-20">
              <input
                type="text"
                placeholder="Enter Name"
                className={`outline-none h-10 px-3 rounded-lg border-2 ${
                  nameError ? "border-red-500" : "border-white"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={submitScore}
                  className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80"
                >
                  Submit Score
                </button>

                <button
                  type="button"
                  onClick={startGame}
                  className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinuteMode;
