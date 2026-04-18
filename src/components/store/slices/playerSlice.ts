import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  lives: number;
  tumars: number;
}

const initialState: PlayerState = {
  lives: 5,
  tumars: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    loseLife: (state) => {
      state.lives -= 1;
    },
    addLife: (state) => {
      state.lives += 1;
    },
    addTumars: (state, action) => {
      state.tumars += action.payload;
    },
    setLives: (state, action) => {
      state.lives = action.payload;
    },
  },
});

export const { loseLife, addLife, addTumars, setLives } = playerSlice.actions;

export default playerSlice.reducer;
