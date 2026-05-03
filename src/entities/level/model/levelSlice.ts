import { createSlice } from "@reduxjs/toolkit";
import type { LevelState } from "./types";
import { getLevelById, submitLevel } from "./levelThunk";

const initialState: LevelState = {
  level: null,
  loading: false,
  submitLoading: false,
  error: null,
};

export const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    resetLevelState: (state) => {
      state.level = null;
      state.loading = false;
      state.submitLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLevelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLevelById.fulfilled, (state, action) => {
        state.loading = false;
        state.level = action.payload;
      })
      .addCase(getLevelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      .addCase(submitLevel.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(submitLevel.fulfilled, (state) => {
        state.submitLoading = false;
      })
      .addCase(submitLevel.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { resetLevelState } = levelSlice.actions;
export default levelSlice.reducer;
