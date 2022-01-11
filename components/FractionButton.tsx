type Props = {
  handleClick: (answer: number[]) => void;
  fraction: number[];
};

const FractionButton = ({ handleClick, fraction }: Props) => {
  return (
    <button
      type="button"
      onClick={() => handleClick(fraction)}
      className="w-12"
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
