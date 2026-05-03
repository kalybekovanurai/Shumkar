import type { ImageOption } from "../model/type";

type Props = {
  option: ImageOption;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isAnswered: boolean;
  onSelect: (option: ImageOption) => void;
};

export const ImageChoiceCard = ({
  option,
  isSelected,
  isCorrect,
  isWrong,
  isAnswered,
  onSelect,
}: Props) => {
  return (
    <button
      onClick={() => onSelect(option)}
      disabled={isAnswered}
      className={`
        group relative rounded-[24px] border-2 bg-white/95 p-3 text-left
        shadow-sm transition-all duration-300 min-h-[220px] md:min-h-[240px]
        hover:-translate-y-1 hover:shadow-lg
        ${isCorrect ? "border-green-400 bg-green-50 scale-[1.01]" : ""}
        ${isWrong ? "border-red-400 bg-red-50 scale-[1.01]" : ""}
        ${!isSelected ? "border-[#E7E2D8] hover:border-[#D8D0C2]" : ""}
      `}
    >
      <div className="w-full h-32 md:h-36 rounded-[16px] overflow-hidden bg-[#F3F4F6] border border-[#ECECEC]">
        <img
          src={option.image}
          alt={option.text}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 min-h-[56px] flex items-center justify-center text-center px-2">
        <p className="text-sm md:text-base font-black text-[#1E2A44] leading-relaxed">
          {option.text}
        </p>
      </div>

      {isCorrect && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-sm shadow">
          ✓
        </div>
      )}

      {isWrong && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-sm shadow">
          ✕
        </div>
      )}
    </button>
  );
};
