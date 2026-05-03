import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store/hooks";
import type { RootState } from "../../../app/store";
import type { Module, ModuleLevel } from "../../../entities/modules/types";
import { getProgressByUserId } from "../../../entities/progress/progressThunk";
import { getModules } from "../../../entities/modules/modulesThunk";
import { buildPath } from "../lib/mapHelpers";


type ProgressLevels = Record<
  number,
  {
    unlocked?: boolean;
    completed?: boolean;
  }
>;

export const useMapPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const progressLevels =
    useSelector((state: RootState) => state.progress.levels) ?? {};

  const modulesState = useSelector((state: RootState) => state.modules);

  const modules: Module[] = modulesState?.modules ?? [];
  const loading = modulesState?.loading ?? false;
  const error = modulesState?.error ?? null;

  useEffect(() => {
    dispatch(getModules());

    const hasProgress = Object.keys(progressLevels).length > 0;

    if (user?.id && !hasProgress) {
      dispatch(getProgressByUserId(user.id));
    }
  }, [dispatch, user?.id, progressLevels]);

  const updatedModules = useMemo(() => {
    return modules.map((module: Module) => ({
      ...module,
      levels: module.levels.map((lvl: ModuleLevel) => ({
        ...lvl,
        unlocked: progressLevels[lvl.id]?.unlocked ?? lvl.unlocked ?? false,
        completed: progressLevels[lvl.id]?.completed ?? lvl.completed ?? false,
      })),
    }));
  }, [modules, progressLevels]);

  const path = useMemo(() => {
    return buildPath(updatedModules);
  }, [updatedModules]);

  const handleClick = (item: any) => {
    if (item.type === "level") {
      const level = item.data;

      if (!level?.unlocked || !level?.id) return;

      if (level.type === "quiz") {
        navigate(`/quiz/${level.id}`);
      }

      if (level.type === "lesson") {
        navigate(`/lesson/${level.id}`);
      }
    }

    if (item.type === "chest") {
      const bonusId = item.quizId;
      const bonusProgress = progressLevels[bonusId];

      if (!bonusId || !bonusProgress?.unlocked) return;

      navigate(`/quiz/${bonusId}`, {
        state: { isBonus: true },
      });
    }
  };

  return {
    path,
    loading,
    error,
    progressLevels: progressLevels as ProgressLevels,
    handleClick,
  };
};
