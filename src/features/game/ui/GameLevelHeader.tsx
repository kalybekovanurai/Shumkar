type Props = {
  title: string;
  isBonus?: boolean;
};

export const GameLevelHeader = ({ title, isBonus = false }: Props) => {
  return (
    <div className="shrink-0 px-3 pt-2 pb-2 text-center">
      <h1 className="text-2xl md:text-3xl font-black text-[#13233F] leading-tight max-w-4xl mx-auto">
        {title}
      </h1>

      {isBonus && (
        <p className="mt-2 text-sm md:text-base text-[#A16207] font-semibold">
          Бонусный уровень: за него даётся в 2 раза больше тумаров ✨
        </p>
      )}
    </div>
  );
};
