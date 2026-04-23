type Props = {
  type: "quiz" | "lesson";
  id: number;
  title?: string;
  unlocked: boolean;
  completed?: boolean;
  onClick?: () => void;
};

export const LevelNode = ({
  type,
  id,
  title,
  unlocked,
  completed = false,
  onClick,
}: Props) => {
  const isLesson = type === "lesson";

  if (isLesson) {
    return (
      <button
        onClick={unlocked ? onClick : undefined}
        disabled={!unlocked}
        className={`
          relative
          min-w-[190px] md:min-w-[220px]
          max-w-[220px] md:max-w-[250px]
          px-4 md:px-5
          py-4 md:py-5
          rounded-[24px]
          border
          overflow-hidden
          shadow-md
          transition-all duration-300
          text-center
          ${
            completed
              ? "bg-[#EEF8F0] border-[#B9DFC5]"
              : unlocked
                ? "bg-gradient-to-b from-[#4E8DF0] to-[#2F73E2] border-[#CFE0FF] hover:scale-[1.02] hover:shadow-lg"
                : "bg-gradient-to-b from-[#C3CAD6] to-[#AEB7C6] border-[#D8DDE7] opacity-80 cursor-not-allowed"
          }
        `}
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center min-h-[44px] md:min-h-[52px]">
          <span
            className={`
              font-black leading-snug break-words
              ${
                completed
                  ? "text-[#227A43] text-base md:text-lg"
                  : unlocked
                    ? "text-white text-base md:text-xl"
                    : "text-white text-base md:text-lg"
              }
            `}
          >
            {title}
          </span>
        </div>

        {completed && (
          <div className="relative z-10 mt-3 flex justify-center">
            <div className="px-3 py-1 rounded-full bg-white text-[#1F8A48] text-xs md:text-sm font-bold shadow-sm">
              Пройдено
            </div>
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={unlocked ? onClick : undefined}
      disabled={!unlocked}
      className={`
        transition-all duration-300
        ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
      `}
    >
      <div
        className={`
          w-25 h-25 md:w-26 md:h-26
          rounded-full
          border-[3px]
          flex items-center justify-center
          font-black text-2xl md:text-4xl
          shadow-sm
          transition-all duration-300
          ${
            completed
                ? "bg-[#10C94B] border-white text-white"
                : unlocked
                ? "bg-[#377DEB] border-white text-white hover:scale-[1.03] hover:shadow-md"
                : "bg-[#AEB7C6] border-[#D8DDE7] text-white opacity-85"
          }
        `}
      >
        {completed ? "✓" : id}
      </div>
    </button>
  );
};
