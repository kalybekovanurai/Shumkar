import { useSelector } from "react-redux";
import type { RootState } from "../store";

const achievementsList = [
  {
    id: "first_quiz",
    title: "Первый шаг",
    description: "Первый уровень",
    icon: "🚀",
  },
  {
    id: "all_module",
    title: "Исследователь сакральных мест",
    description: "Пройди весь модуль",
    icon: "🧭",
  },
  {
    id: "petroglyph_keeper",
    title: "Хранитель петроглифов",
    description: "Пройди  весь уровень",
    icon: "🪨",
  },
  {
    id: "bonus",
    title: "Охотник за сокровищами",
    description: "Пройди бонусный уровень",
    icon: "🎁",
  },
];

export const AchievementsPage = () => {
  const progress = useSelector((state: RootState) => state.progress.levels);

  const completedCount = Object.values(progress).filter(
    (lvl) => lvl.completed,
  ).length;

  const isFirstDone = completedCount >= 1;
  const isThreeDone = completedCount >= 3;
  const isModuleDone = completedCount >= 5;

  const bonusDone = Object.values(progress).some(
    (lvl: any) => lvl.isBonus && lvl.completed,
  );

  const checkAchievement = (id: string) => {
    switch (id) {
      case "first_quiz":
        return isFirstDone;
      case "3_quiz":
        return isThreeDone;
      case "all_module":
        return isModuleDone;
      case "bonus":
        return bonusDone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#2B5FBA]">
        Достижения 🏆
      </h1>

      <div className="max-w-md mx-auto flex flex-col gap-4">
        {achievementsList.map((ach) => {
          const unlocked = checkAchievement(ach.id);

          return (
            <div
              key={ach.id}
              className={`
                p-4 rounded-xl shadow flex items-center gap-4 transition
                ${unlocked ? "bg-white" : "bg-gray-300 opacity-60 grayscale"}
              `}
            >
              <div className="text-3xl">{ach.icon}</div>

              <div className="flex-1">
                <h2 className="font-bold text-lg">{ach.title}</h2>
                <p className="text-sm text-gray-600">{ach.description}</p>
              </div>

              {unlocked ? (
                <span className="text-green-500 text-xl">✓</span>
              ) : (
                <span className="text-gray-500 text-xl">🔒</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 📊 Прогресс */}
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-lg font-bold mb-2">Общий прогресс</h2>

        <div className="h-3 bg-gray-300 rounded">
          <div
            className="h-3 bg-[#2B5FBA] rounded transition-all"
            style={{
              width: `${Math.min((completedCount / 10) * 100, 100)}%`,
            }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-600">
          Пройдено уровней: {completedCount}
        </p>
      </div>
    </div>
  );
};
