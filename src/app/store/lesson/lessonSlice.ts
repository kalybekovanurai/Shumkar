import { createSlice } from "@reduxjs/toolkit";
import type { LessonState } from "./types";
import { completeLesson, getLessonById } from "./lessonThunk";

const initialState: LessonState = {
  lesson: null,
  loading: false,
  completeLoading: false,
  error: null,
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    resetLessonState: (state) => {
      state.lesson = null;
      state.loading = false;
      state.completeLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLessonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(getLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      .addCase(completeLesson.pending, (state) => {
        state.completeLoading = true;
        state.error = null;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.completeLoading = false;
        if (state.lesson && state.lesson.id === action.payload.lessonId) {
          state.lesson.completed = true;
        }
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.completeLoading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { resetLessonState } = lessonSlice.actions;
export default lessonSlice.reducer;
