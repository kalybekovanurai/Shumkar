import { createSlice } from "@reduxjs/toolkit";
import type { ModulesState } from "./types";
import { getModules } from "./modulesThunk";

const initialState: ModulesState = {
  modules: [],
  loading: false,
  error: null,
};

export const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    resetModulesState: (state) => {
      state.modules = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(getModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { resetModulesState } = modulesSlice.actions;
export default modulesSlice.reducer;
