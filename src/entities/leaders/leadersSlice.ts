import { createSlice } from "@reduxjs/toolkit";
import type { LeadersState } from "./types";
import { getLeaders } from "./leadersThunk";

const initialState: LeadersState = {
  leaders: [],
  loading: false,
  error: null,
};

export const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    resetLeadersState: (state) => {
      state.leaders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.leaders = action.payload;
      })
      .addCase(getLeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { resetLeadersState } = leadersSlice.actions;
export default leadersSlice.reducer;