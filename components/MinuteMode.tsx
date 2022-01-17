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
oneMinute.setSeconds(oneMinute.getSeconds() + 30);

const incorrectMessages = {
  none: [
    "Yikes",
    "Can't do any worse... right?",
    "Remember, the goal of the game is to pick the LARGER fraction",
    "Don't worry, I won't tell anyone about this",
    "Maybe this game isn't for you",
  ],
  bad: [
    "Do better next time",
    "What was that??",
    "Must have been a misclick... right?",
    "Time to pick up the pace",
  ],
  decent: [
    "Not the worst I've seen",
    "C'mon, I know you can do better than that",
    "Decent, try to answer correctly next time",
    "We're getting somewhere",
  ],
  good: [
    "Wow, now if only you got that last one right",
    "Not too bad",
    "Keep trying!",
    "Don't get frustated",
    "So close! yet so far...",
    "That was pretty good... until it wasn't",
  ],
};

const getRandomInt = (max: number) => {
  const randomInt = Math.floor(Math.random() * max);
  return randomInt;
};

const generateIncorrectMessage = (numCorrect: number) => {
  if (numCorrect === 0) {
    const randomNum = getRandomInt(incorrectMessages.none.length);
    return incorrectMessages.none[randomNum];
  }
  if (numCorrect > 0 && numCorrect <= 5) {
    const randomNum = getRandomInt(incorrectMessages.bad.length);
    return incorrectMessages.bad[randomNum];
  }
  if (numCorrect > 5 && numCorrect <= 15) {
    const randomNum = getRandomInt(incorrectMessages.decent.length);
    return incorrectMessages.decent[randomNum];
  }
  if (numCorrect > 15) {
    const randomNum = getRandomInt(incorrectMessages.good.length);
    return incorrectMessages.good[randomNum];
  }
  return "It must be a glitch";
};

const MinuteMode: React.FC<Props> = ({ resetMode }) => {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [incorrectMessage, setIncorrectMessage] = useState<string>("");
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
      time.setSeconds(time.getSeconds() + 30);
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
    setIncorrectMessage(generateIncorrectMessage(currentStreak));
    pause();
    setGameRunning(false);
    setTryAgain(true);

    console.log(currentStreak);
  };

  const onCorrect = () => {
    setCurrentStreak((prev) => prev + 1);
  };

  const submitScore = async () => {
    try {
      if (username !== "") {
        setIsSubmitting(true);
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
            <div className="flex flex-col space-y-1 mt-20 p-4 border-2 border-white w-96">
              <span className="text-2xl font-bold mb-4">RULES</span>
              <span className="text-lg">1. Select the larger fraction</span>
              <span className="text-lg">2. Be fast</span>
              <div className="flex items-center text-lg space-x-2">
                <span>3. Use</span>
                <img src="/misc/leftKeyWhite.png" className="w-8 h-auto" />
                <span>and</span>
                <img src="/misc/rightKeyWhite.png" className="w-8 h-auto" />
                <span>to select a fraction</span>
              </div>
              <span className="text-lg">4. Be faster</span>
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
            <span className="mt-2 text-base">{incorrectMessage}</span>
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
                  className="bg-gray-800 py-4 px-12 rounded-xl shadow-lg text-3xl hover:bg-opacity-80 disabled:opacity-50"
                  disabled={isSubmitting}
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
