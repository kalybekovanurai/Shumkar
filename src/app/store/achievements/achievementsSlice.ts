import { createSlice } from "@reduxjs/toolkit";
import type { AchievementsState } from "./types";
import { getAchievements } from "./achievementsThunk";

const initialState: AchievementsState = {
  achievements: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    resetAchievementsState: (state) => {
      state.achievements = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching achievements";
      });
  },
});

export const { resetAchievementsState } = achievementsSlice.actions;
export default achievementsSlice.reducer;
