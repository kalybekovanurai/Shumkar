import type { Module, ModuleLevel } from "../types";

type ProgressLevels = Record<
  number,
  {
    unlocked?: boolean;
    completed?: boolean;
  }
>;

export const mapModulesWithProgress = (
  modules: Module[],
  progressLevels: ProgressLevels,
): Module[] => {
  return modules.map((module) => ({
    ...module,
    levels: module.levels.map((lvl: ModuleLevel) => ({
      ...lvl,
      unlocked: progressLevels[lvl.id]?.unlocked ?? lvl.unlocked ?? false,
      completed: progressLevels[lvl.id]?.completed ?? lvl.completed ?? false,
    })),
  }));
};
