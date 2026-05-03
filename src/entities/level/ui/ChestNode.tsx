import chest from "../../../assets/images/chest.png";

type Props = {
  onClick: () => void;
  unlocked?: boolean;
  completed?: boolean;
};

export const ChestNode = ({
  onClick,
  unlocked = false,
  completed = false,
}: Props) => {
  return (
    <button
      onClick={unlocked ? onClick : undefined}
      disabled={!unlocked}
      className={`
        relative
        w-25 h-25 md:w-24 md:h-24
        rounded-full
        border-[3px]
        flex items-center justify-center
        shadow-sm
        transition-all duration-300
        ${
          completed
            ? "bg-[#FFF3D9] border-[#E6C86E] hover:scale-[1.03]"
            : unlocked
              ? "bg-[#FFE7A8] border-[#F1C94D] hover:scale-[1.03] hover:shadow-md"
              : "bg-[#D4D8E0] border-[#C0C6D2] opacity-75 cursor-not-allowed"
        }
      `}
    >
      <img
        src={chest}
        alt="Сундук"
        className={`
          w-15 h-10 md:w-26 md:h-26 object-contain
          ${!unlocked ? "grayscale opacity-80" : ""}
        `}
      />

      {completed && (
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border border-[#DDE4D8] flex items-center justify-center text-[#17B54A] text-sm md:text-base font-black shadow-sm">
          ✓
        </div>
      )}

      {!completed && !unlocked && (
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border border-[#D8DDE7] flex items-center justify-center text-xs md:text-sm shadow-sm">
          🔒
        </div>
      )}
    </button>
  );
};
