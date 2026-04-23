type Props = {
  lives: number;
  tumars: number;
  hints: number;
  shields: number;
};

export const ShopInventoryCard = ({ lives, tumars, hints, shields }: Props) => {
  return (
    <div className="bg-white/95 rounded-[24px] shadow-md border border-[#EFE7D8] p-4">
      <h2 className="text-lg md:text-2xl font-black text-[#2B5FBA] mb-4">
        Инвентарь
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[18px] bg-[#FFF1F3] px-3 py-3 border border-[#F8D7DF]">
          <p className="text-xs md:text-sm text-[#6B7280]">Жизни</p>
          <p className="text-xl md:text-2xl font-black text-[#1E2A44]">
            ❤️ {lives}
          </p>
        </div>

        <div className="rounded-[18px] bg-[#FFF8E6] px-3 py-3 border border-[#F3E0A2]">
          <p className="text-xs md:text-sm text-[#6B7280]">Тумары</p>
          <p className="text-xl md:text-2xl font-black text-[#1E2A44]">
            🪙 {tumars}
          </p>
        </div>

        <div className="rounded-[18px] bg-[#EEF5FF] px-3 py-3 border border-[#D6E6FF]">
          <p className="text-xs md:text-sm text-[#6B7280]">Подсказки</p>
          <p className="text-xl md:text-2xl font-black text-[#1E2A44]">
            🧩 {hints}
          </p>
        </div>

        <div className="rounded-[18px] bg-[#ECFDF3] px-3 py-3 border border-[#CDEFD9]">
          <p className="text-xs md:text-sm text-[#6B7280]">Щиты</p>
          <p className="text-xl md:text-2xl font-black text-[#1E2A44]">
            🛡️ {shields}
          </p>
        </div>
      </div>
    </div>
  );
};
