export type LevelProgress = {
  unlocked: boolean;
  completed: boolean;
  isBonus?: boolean;
};

export interface ProgressResponse {
  userId: number;
  levels: Record<number, LevelProgress>;
  bestStreak: number;
}

export interface ProgressState {
  levels: Record<number, LevelProgress>;
  bestStreak: number;
  loading: boolean;
  error: string | null;
}
