import React, { useEffect } from "react";

interface Props {
  incorrectMessage: string;
  startGame: () => void;
}

const TryAgain: React.FC<Props> = ({ incorrectMessage, startGame }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space" || e.code === "Enter") {
      console.log("trying again");
      startGame();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="font-bold text-red-500 text-7xl sm:text-8xl">WRONG</span>
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
  );
};

export default TryAgain;
