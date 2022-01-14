import React, { useEffect } from "react";

interface Props {
  handleClick: (answer: number[]) => void;
  triggerKey: string;
  fraction: number[];
}

const FractionButton: React.FC<Props> = ({
  handleClick,
  triggerKey,
  fraction,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === triggerKey) {
      console.log(`submitting ${fraction}`);
      handleClick(fraction);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick]);

  const numberClass = "bg-gray-800 font-bold text-3xl text-center p-2";

  return (
    <button
      type="button"
      onClick={() => handleClick(fraction)}
      className="w-24 py-2 px-5 bg-gray-800 rounded-2xl hover:shadow-lg"
    >
      <span className="flex flex-col w-full divide-y-2 divide-gray-300">
        <span className={numberClass}>{fraction[0]}</span>
        <span className={numberClass}>{fraction[1]}</span>
      </span>
    </button>
  );
};

export default FractionButton;
