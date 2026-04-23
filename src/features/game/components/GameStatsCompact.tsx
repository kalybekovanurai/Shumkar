import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store/store";

export const GameStatsCompact = () => {
  const lives = useSelector((state: RootState) => state.player.lives ?? 0);
  const xp = useSelector((state: RootState) => state.player.xp ?? 0);
  const streak = useSelector((state: RootState) => state.player.streak ?? 0);
  const tumars = useSelector((state: RootState) => state.player.tumars ?? 0);

  const stats = [
    {
      label: "Жизни",
      value: lives,
      icon: "❤️",
      bg: "bg-[#FFF1F3]",
      border: "border-[#F8D7DF]",
    },
    {
      label: "XP",
      value: xp,
      icon: "⭐",
      bg: "bg-[#FFF8E6]",
      border: "border-[#F3E0A2]",
    },
    {
      label: "Серия",
      value: streak,
      icon: "🔥",
      bg: "bg-[#FFF3E8]",
      border: "border-[#F6D2B8]",
    },
    {
      label: "Тумары",
      value: tumars,
      icon: "🪙",
      bg: "bg-[#FFF8E6]",
      border: "border-[#F3E0A2]",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-[18px] border ${stat.border} ${stat.bg} px-3 py-2.5 shadow-sm`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/80 flex items-center justify-center text-lg md:text-xl shrink-0">
              {stat.icon}
            </div>

            <div className="min-w-0">
              <p className="text-[11px] md:text-xs text-[#6B7280] leading-none">
                {stat.label}
              </p>
              <p className="text-xl md:text-3xl font-black text-[#1E2A44] leading-none mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
