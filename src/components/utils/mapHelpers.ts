import type { Module, PathItem } from "../types/level";


export const buildPath = (modules: Module[]): PathItem[] => {
  const result: PathItem[] = [];

  modules.forEach((module) => {
    module.levels.forEach((level) => {
      result.push({ type: "level", data: level });
    });

    result.push({ type: "chest" });
  });

  return result;
};

export const getOffset = (index: number) => {
  return index % 2 === 0 ? -100 : 130;
};
