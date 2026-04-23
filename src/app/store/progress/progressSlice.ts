import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProgressByUserId } from "./progressThunk";
import type { LevelProgress, ProgressState } from "./types";

const defaultLevels: Record<number, LevelProgress> = {
  1: { unlocked: true, completed: false },
  2: { unlocked: false, completed: false },
  3: { unlocked: false, completed: false },
  4: { unlocked: false, completed: false },
  5: { unlocked: false, completed: false },
  6: { unlocked: false, completed: false },
  901: { unlocked: false, completed: false, isBonus: true },
};

const initialState: ProgressState = {
  levels: { ...defaultLevels },
  bestStreak: 0,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    completeLevel: (state, action: PayloadAction<number>) => {
      const levelId = action.payload;

      if (!state.levels) {
        state.levels = { ...defaultLevels };
      }

      if (!state.levels[levelId]) {
        state.levels[levelId] = {
          unlocked: true,
          completed: false,
        };
      }

      state.levels[levelId].completed = true;

      if (levelId !== 901) {
        const nextLevel = levelId + 1;

        if (state.levels[nextLevel]) {
          state.levels[nextLevel].unlocked = true;
        }
      }

      if (
        state.levels[1]?.completed &&
        state.levels[2]?.completed &&
        state.levels[901]
      ) {
        state.levels[901].unlocked = true;
      }
    },

    unlockLevel: (state, action: PayloadAction<number>) => {
      const levelId = action.payload;

      if (!state.levels) {
        state.levels = { ...defaultLevels };
      }

      if (!state.levels[levelId]) {
        state.levels[levelId] = {
          unlocked: true,
          completed: false,
        };
      } else {
        state.levels[levelId].unlocked = true;
      }
    },

    setBestStreak: (state, action: PayloadAction<number>) => {
      if (action.payload > state.bestStreak) {
        state.bestStreak = action.payload;
      }
    },

    resetProgress: (state) => {
      state.levels = { ...defaultLevels };
      state.bestStreak = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProgressByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = {
          ...defaultLevels,
          ...(action.payload?.levels ?? {}),
        };
        state.bestStreak = action.payload?.bestStreak ?? 0;
      })
      .addCase(getProgressByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching progress";
      });
  },
});

export const { completeLevel, unlockLevel, setBestStreak, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
