import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";

export const GameStatsCompact = () => {
  const lives = useSelector((state: RootState) => state.player.lives ?? 0);
  const xp = useSelector((state: RootState) => state.player.xp ?? 0);
  const streak = useSelector((state: RootState) => state.player.streak ?? 0);
  const tumars = useSelector((state: RootState) => state.player.tumars ?? 0);

  const stats = [
    {
      id: "lives",
      title: "Жизни",
      value: lives,
      icon: "💗",
      cardClass: "bg-[#FDF2F6]/88 border-[#F2CDD7]",
    },
    {
      id: "xp",
      title: "XP",
      value: xp,
      icon: "⭐",
      cardClass: "bg-[#FFFBEF]/88 border-[#EFD894]",
    },
    {
      id: "streak",
      title: "Серия",
      value: streak,
      icon: "🔥",
      cardClass: "bg-[#FFF6F0]/88 border-[#EDC5A8]",
    },
    {
      id: "tumars",
      title: "Тумары",
      value: tumars,
      icon: "🪙",
      cardClass: "bg-[#FFFBEF]/88 border-[#EFD894]",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`
            rounded-[18px] border shadow-sm backdrop-blur-[2px]
            px-4 py-3 md:px-4 md:py-3
            min-h-[92px] md:min-h-[96px]
            ${stat.cardClass}
          `}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/85 flex items-center justify-center text-xl shrink-0">
              {stat.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#6B7280] leading-none">
                {stat.title}
              </p>

              <p className="mt-3 text-3xl md:text-[42px] font-black text-[#102040] leading-none">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
