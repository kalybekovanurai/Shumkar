import type { LevelGame } from "../components/types/game";
import { levelGames } from "./levelGames";

const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const createBonusLevel = (sourceLevelIds: number[]): LevelGame => {
  const sourceLevels = sourceLevelIds
    .map((id) => levelGames[id])
    .filter(Boolean);

  const allQuestions = sourceLevels.flatMap((level) => level.pictureQuestions);
  const allSequenceItems = sourceLevels.flatMap((level) => level.sequenceGame);

  const shuffledQuestions = shuffleArray(allQuestions)
    .slice(0, 4)
    .map((question, index) => ({
      ...question,
      id: index + 1,
    }));

  const shuffledSequenceSource = shuffleArray(allSequenceItems).slice(0, 4);

  const shuffledSequence = shuffledSequenceSource.map((item, index) => ({
    ...item,
    id: index + 1,
    order: index + 1,
  }));

  return {
    id: 999,
    title: "Бонус: испытание Шумкара",
    pictureQuestions: shuffledQuestions,
    sequenceHint:
      "Шумкар: Вспомни прошлые легенды и попробуй восстановить события!",
    sequenceGame: shuffledSequence,
  };
};
