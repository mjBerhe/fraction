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
    autoStart: true,
    onExpire: () => console.log("Timer done"),
  });

  useEffect(() => {
    return () => {
      restart(oneMinute, true);
    };
  }, []);

  const [startGame, setStartGame] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <button onClick={resetMode} className="p-2">
          Home
        </button>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center">
        {!startGame && (
          <div className="flex flex-col items-center space-y-8">
            <span className="text-xl">
              Answer as many questions correctly before the timer hits 0
            </span>
            <button
              type="button"
              onClick={() => setStartGame(true)}
              className="border border-white py-2 px-4 rounded-lg shadow"
            >
              Start
            </button>
          </div>
        )}
        {startGame && (
          <div>
            {/* <div className="flex">
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
        </div> */}
            <div className="text-2xl">
              {minutes} : {seconds === 0 ? "00" : seconds}
            </div>
            <FractionBase />
          </div>
        )}
      </div>
    </div>
  );
};

export default MinuteMode;
