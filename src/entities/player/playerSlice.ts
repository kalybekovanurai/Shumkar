import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  lives: number;
  tumars: number;
  xp: number;
  streak: number;
  hints: number;
  shields: number;
  skin: string;
}

const initialState: PlayerState = {
  lives: 5,
  tumars: 0,
  xp: 0,
  streak: 0,
  hints: 0,
  shields: 0,
  skin: "default",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    loseLife: (state) => {
      if (state.shields > 0) {
        state.shields -= 1;
        return;
      }

      if (state.lives > 0) {
        state.lives -= 1;
      }

      state.streak = 0;
    },
    addLife: (state) => {
      state.lives += 1;
    },
    addTumars: (state, action: PayloadAction<number>) => {
      state.tumars = (state.tumars ?? 0) + action.payload;
    },
    spendTumars: (state, action: PayloadAction<number>) => {
      state.tumars = Math.max((state.tumars ?? 0) - action.payload, 0);
    },
    addXp: (state, action: PayloadAction<number>) => {
      state.xp = (state.xp ?? 0) + action.payload;
    },
    increaseStreak: (state) => {
      state.streak = (state.streak ?? 0) + 1;
    },
    restoreStreak: (state) => {
      if (state.streak === 0) {
        state.streak = 1;
      }
    },
    addHint: (state) => {
      state.hints += 1;
    },
    useHint: (state) => {
      if (state.hints > 0) {
        state.hints -= 1;
      }
    },
    addShield: (state) => {
      state.shields += 1;
    },
    setSkin: (state, action: PayloadAction<string>) => {
      state.skin = action.payload;
    },
    resetPlayer: () => initialState,
  },
});

export const {
  loseLife,
  addLife,
  addTumars,
  spendTumars,
  addXp,
  increaseStreak,
  restoreStreak,
  addHint,
  useHint,
  addShield,
  setSkin,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
