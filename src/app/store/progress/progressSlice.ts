import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LevelProgress = {
  unlocked: boolean;
  completed: boolean;
  isBonus?: boolean;
};

interface ProgressState {
  levels: Record<number, LevelProgress>;
  bestStreak: number;
}

const initialState: ProgressState = {
  levels: {
    1: { unlocked: true, completed: false },
    2: { unlocked: false, completed: false },
    3: { unlocked: false, completed: false },
    4: { unlocked: false, completed: false },
    5: { unlocked: false, completed: false },
    6: { unlocked: false, completed: false },

    901: { unlocked: false, completed: false, isBonus: true },
  },
  bestStreak: 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    completeLevel: (state, action: PayloadAction<number>) => {
      const levelId = action.payload;

      if (state.levels[levelId]) {
        state.levels[levelId].completed = true;
      }

      // Бонус не открывает обычные уровни
      if (levelId !== 901) {
        const nextLevel = levelId + 1;

        if (state.levels[nextLevel]) {
          state.levels[nextLevel].unlocked = true;
        }
      }

      // Бонус открывается после прохождения 1 и 2 уровней
      if (state.levels[1]?.completed && state.levels[2]?.completed) {
        state.levels[901].unlocked = true;
      }
    },

    unlockLevel: (state, action: PayloadAction<number>) => {
      const levelId = action.payload;

      if (state.levels[levelId]) {
        state.levels[levelId].unlocked = true;
      }
    },

    setBestStreak: (state, action: PayloadAction<number>) => {
      if (action.payload > state.bestStreak) {
        state.bestStreak = action.payload;
      }
    },

    resetProgress: () => initialState,
  },
});

export const { completeLevel, unlockLevel, setBestStreak, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
