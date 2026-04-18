import { createSlice } from "@reduxjs/toolkit";

interface LevelProgress {
  completed?: boolean;
  unlocked?: boolean;
}

interface ProgressState {
  levels: Record<number, LevelProgress>;
}

const initialState: ProgressState = {
  levels: {
    1: { unlocked: true }, 
  },
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    completeLevel: (state, action) => {
      const id = action.payload;
      state.levels[id] = {
        ...state.levels[id],
        completed: true,
      };

      const nextId = id + 1;

      state.levels[nextId] = {
        ...state.levels[nextId],
        unlocked: true,
      };
    },
  },
});

export const { completeLevel } = progressSlice.actions;
export default progressSlice.reducer;
