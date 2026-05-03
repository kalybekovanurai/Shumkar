import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../shared/api/axiosInstance";
import { mapLevelFromApi } from "./levelMapper";
import type { LevelGame, SubmitLevelPayload, SubmitLevelResponse } from "./types";

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
  SubmitLevelResponse,
  { levelId: number; payload: SubmitLevelPayload },
  { rejectValue: string }
>("level/submit", async ({ levelId, payload }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `${API}/${levelId}/submit`,
      payload,
    );
    return response.data;
  } catch (error: any) {
    console.log("SUBMIT PAYLOAD:", payload);
    console.log("SUBMIT ERROR RESPONSE:", error?.response?.data);
    return rejectWithValue(getErrorMessage(error));
  }
});
