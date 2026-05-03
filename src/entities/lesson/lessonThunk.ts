import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Lesson } from "./types";
import { axiosInstance } from "../../shared/api/axiosInstance";

const API = "/lessons";

export const getLessonById = createAsyncThunk<
  Lesson,
  number,
  { rejectValue: string }
>("lesson/getById", async (lessonId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Lesson>(`${API}/${lessonId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error fetching lesson",
    );
  }
});

export const completeLesson = createAsyncThunk<
  { success: boolean; lessonId: number },
  number,
  { rejectValue: string }
>("lesson/complete", async (lessonId, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`${API}/${lessonId}/complete`);
    return { success: true, lessonId };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error completing lesson",
    );
  }
});
