import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import happyShumkar from "../assets/images/happyShumkar.png";
import { PageBackgroundLayout } from "../shared/UI/PageBackgroundLayout";
import { useAppDispatch } from "../app/store/hooks";
import { getAchievements } from "../app/store/achievements/achievementsThunk";

const baseLevelIds = [1, 2, 3, 4, 5, 6];

export const AchievementsPage = () => {
  const dispatch = useAppDispatch();

  const { achievements, loading, error } = useSelector(
    (state: RootState) => state.achievements,
  );

  const progressLevels =
    useSelector((state: RootState) => state.progress.levels) ?? {};

  const completedBaseCount = baseLevelIds.filter(
    (id) => progressLevels[id]?.completed,
  ).length;

  useEffect(() => {
    dispatch(getAchievements());
  }, [dispatch]);

  if (loading) {
    return (
      <PageBackgroundLayout contentClassName="max-w-5xl mx-auto">
        <div className="flex items-center justify-center min-h-[320px]">
          <p className="text-lg font-semibold text-[#2B5FBA]">
            Загрузка достижений...
          </p>
        </div>
      </PageBackgroundLayout>
    );
  }

  if (error) {
    return (
      <PageBackgroundLayout contentClassName="max-w-5xl mx-auto">
        <div className="flex items-center justify-center min-h-[320px] px-4">
          <p className="text-center text-red-500 font-semibold">
            {typeof error === "string" ? error : "Ошибка загрузки достижений"}
          </p>
        </div>
      </PageBackgroundLayout>
    );
  }

  return (
    <PageBackgroundLayout contentClassName="max-w-5xl mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-black text-[#2B5FBA] mb-6">
        Достижения 🏆
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-5">
        <div className="space-y-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`
                rounded-[24px] border px-5 py-4 shadow-sm transition
                ${
                  ach.unlocked
                    ? "bg-white/95 border-[#EFE7D8]"
                    : "bg-[#ECECEC]/90 border-[#E2E2E2] opacity-75 grayscale"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl shrink-0">{ach.icon}</div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-lg md:text-2xl text-[#1E2A44]">
                    {ach.title}
                  </h2>
                  <p className="text-[#6B7280] text-sm md:text-base mt-1">
                    {ach.description}
                  </p>
                </div>

                <div className="shrink-0 text-2xl">
                  {ach.unlocked ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-gray-400">🔒</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white/95 rounded-[24px] shadow-md border border-[#EFE7D8] p-4">
            <h2 className="text-lg md:text-xl font-black text-[#2B5FBA] mb-4">
              Основной прогресс
            </h2>

            <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-3 bg-[#2B5FBA] rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (completedBaseCount / baseLevelIds.length) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>

            <p className="mt-3 text-[#6B7280] text-sm md:text-base">
              Пройдено основных уровней:{" "}
              <span className="font-bold text-[#1E2A44]">
                {completedBaseCount} / {baseLevelIds.length}
              </span>
            </p>
          </div>

          <div className="bg-[#F6EBCF]/95 rounded-[24px] border border-[#EBDDBB] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={happyShumkar}
                alt="Шумкар"
                className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0"
              />
              <div>
                <p className="text-[#6B5B2E] font-bold text-base">
                  Ты на верном пути!
                </p>
                <p className="text-[#6B5B2E] text-sm mt-1">
                  Продолжай в том же духе и открывай новые знания вместе со
                  Шумкаром.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-[24px] shadow-md border border-[#EFE7D8] p-4">
            <p className="text-[#D4A62A] font-semibold text-sm md:text-base">
              ✨ Бонусный уровень не обязателен, но даёт больше тумаров
            </p>
          </div>
        </div>
      </div>
    </PageBackgroundLayout>
  );
};
