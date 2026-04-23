import { useEffect } from "react";
import background from "../assets/images/bOzUT.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import { useAppDispatch } from "../app/store/hooks";
import {
  buildPath,
  getArrowDirection,
  getOffsetClass,
} from "../shared/lib/mapHelpers";
import { LevelNode } from "../entities/level/LevelNode";
import { ChestNode } from "../entities/level/ChestNode";
import PathLine from "../entities/level/PathLine";
import { getModules } from "../app/store/modules/modulesThunk";
import { getProgressByUserId } from "../app/store/progress/progressThunk";

export const MapPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const progressLevels =
    useSelector((state: RootState) => state.progress.levels) ?? {};

  const modulesState = useSelector((state: RootState) => state.modules);
  const modules = modulesState?.modules ?? [];
  const loading = modulesState?.loading ?? false;
  const error = modulesState?.error ?? null;

  useEffect(() => {
    dispatch(getModules());

    const hasProgress = Object.keys(progressLevels).length > 0;

    if (user?.id && !hasProgress) {
      dispatch(getProgressByUserId(user.id));
    }
  }, [dispatch, user?.id, progressLevels]);

  const updatedModules = modules.map((module) => ({
    ...module,
    levels: module.levels.map((lvl) => ({
      ...lvl,
      unlocked: progressLevels[lvl.id]?.unlocked ?? lvl.unlocked ?? false,
      completed: progressLevels[lvl.id]?.completed ?? lvl.completed ?? false,
    })),
  }));

  const path = buildPath(updatedModules);

  const handleClick = (item: any) => {
    if (item.type === "level") {
      const level = item.data;

      if (!level?.unlocked) return;
      if (!level?.id) return;

      if (level.type === "quiz") {
        navigate(`/quiz/${level.id}`);
      } else if (level.type === "lesson") {
        navigate(`/lesson/${level.id}`);
      }
    }

    if (item.type === "chest") {
      const bonusId = item.quizId;
      const bonusProgress = progressLevels[bonusId];

      if (!bonusId) return;
      if (!bonusProgress?.unlocked) return;

      navigate(`/quiz/${bonusId}`, {
        state: { isBonus: true },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <p className="text-lg font-semibold text-[#2B5FBA]">
          Загрузка уровней...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-84px)] flex items-center justify-center bg-[#F7F3EA] px-4">
        <p className="text-center text-red-500 font-semibold">
          {typeof error === "string" ? error : "Ошибка загрузки карты"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-[calc(100dvh-84px)] bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(247,243,234,0.70), rgba(247,243,234,0.70)), url(${background})`,
        backgroundSize: "auto",
      }}
    >
      <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto pt-8 sm:pt-10 md:pt-14 pb-24 px-4 flex flex-col items-center">
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          const offsetClass = getOffsetClass(index);
          const direction = getArrowDirection(index);

          return (
            <div key={index} className="flex flex-col items-center w-full">
              <div
                className={`transition-transform duration-300 ${offsetClass}`}
              >
                {item.type === "level" ? (
                  <LevelNode
                    type={item.data.type}
                    id={item.data.id}
                    title={item.data.title}
                    unlocked={item.data.unlocked}
                    completed={item.data.completed}
                    onClick={() => handleClick(item)}
                  />
                ) : (
                  <ChestNode
                    onClick={() => handleClick(item)}
                    unlocked={progressLevels[item.quizId]?.unlocked ?? false}
                    completed={progressLevels[item.quizId]?.completed ?? false}
                  />
                )}
              </div>

              {!isLast && <PathLine direction={direction} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
