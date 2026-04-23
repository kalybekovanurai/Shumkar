import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LevelGame, SubmitLevelPayload } from "./types";
import { axiosInstance } from "../../../shared/configs/axiosInstance";
import { mapLevelFromApi } from "./levelMapper";

const API = "/levels";

const getErrorMessage = (error: any): string => {
  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item: any) => item?.msg || "Validation error")
      .join(", ");
  }

  if (typeof error?.response?.data?.message === "string") {
    return error.response.data.message;
  }

  return error.message || "Error";
};

export const getLevelById = createAsyncThunk<
  LevelGame,
  number,
  { rejectValue: string }
>("level/getById", async (levelId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API}/${levelId}`);
    return mapLevelFromApi(response.data);
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const submitLevel = createAsyncThunk<
  { success: boolean; levelId: number },
  { levelId: number; payload: SubmitLevelPayload },
  { rejectValue: string }
>("level/submit", async ({ levelId, payload }, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`${API}/${levelId}/submit`, payload);
    return { success: true, levelId };
  } catch (error: any) {
    console.log("SUBMIT PAYLOAD:", payload);
    console.log("SUBMIT ERROR RESPONSE:", error?.response?.data);
    return rejectWithValue(getErrorMessage(error));
  }
});
