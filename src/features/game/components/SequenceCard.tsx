import type { SequenceItem } from "../../../components/types/game";

type Props = {
  item: SequenceItem;
  selectedNumber: number | null;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export const SequenceCard = ({
  item,
  selectedNumber,
  isSelected,
  onSelect,
}: Props) => {
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`
        group relative rounded-[24px] border-2 bg-white/95 p-3 text-left
        shadow-sm transition-all duration-300 min-h-[210px] md:min-h-[225px]
        hover:-translate-y-1 hover:shadow-lg
        ${
          isSelected
            ? "border-[#2B5FBA] bg-blue-50 scale-[1.01]"
            : "border-[#E7E2D8] hover:border-[#D8D0C2]"
        }
      `}
    >
      {selectedNumber && (
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[#2B5FBA] text-white flex items-center justify-center font-black text-sm shadow-md">
          {selectedNumber}
        </div>
      )}

      <div className="w-full h-28 md:h-32 rounded-[16px] overflow-hidden bg-[#F3F4F6] border border-[#ECECEC]">
        <img
          src={item.image}
          alt={item.text}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 min-h-[52px] flex items-center justify-center text-center px-2">
        <p className="font-black text-[#1E2A44] text-sm md:text-base leading-relaxed">
          {item.text}
        </p>
      </div>
    </button>
  );
};
