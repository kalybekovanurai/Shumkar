import type { Module, PathItem } from "../../components/types/level";

const bonusIds = [901, 902, 903];

export const buildPath = (modules: Module[]): PathItem[] => {
  const result: PathItem[] = [];

  modules.forEach((module, index) => {
    module.levels.forEach((level) => {
      result.push({ type: "level", data: level });
    });

    if (bonusIds[index]) {
      result.push({ type: "chest", quizId: bonusIds[index] });
    }
  });

  return result;
};

export const getOffsetClass = (index: number) => {
  return index % 2 === 0
    ? "-translate-x-7 sm:-translate-x-12 md:-translate-x-20"
    : "translate-x-7 sm:translate-x-12 md:translate-x-20";
};

export const getArrowDirection = (index: number): "left" | "right" => {
  return index % 2 === 0 ? "right" : "left";
};
