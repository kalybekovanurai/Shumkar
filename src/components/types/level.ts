export type Level = {
  type: "quiz" | "lesson";
  id: number;
  title?: string;
  unlocked: boolean;
  completed?: boolean;
  isBonus?: boolean;
};

export type Module = {
  id: number;
  levels: Level[];
};

export type PathItem = { type: "level"; data: Level } | { type: "chest" };
