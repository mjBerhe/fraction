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

  return (
    <button
      type="button"
      onClick={() => handleClick(fraction)}
      className="w-24 py-2 px-5 border border-gray-800 rounded-xl hover:border-2"
    >
      <span className="flex flex-col w-full divide-y-2 divide-black">
        <span className="font-bold text-2xl text-center p-2">
          {fraction[0]}
        </span>
        <span className="font-bold text-2xl text-center p-2">
          {fraction[1]}
        </span>
      </span>
    </button>
  );
};

export default FractionButton;
