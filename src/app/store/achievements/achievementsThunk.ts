import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Achievement } from "./types";
import { axiosInstance } from "../../../shared/configs/axiosInstance";

const API = "/achievements/";

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

  return error.message || "Error fetching achievements";
};

export const getAchievements = createAsyncThunk<
  Achievement[],
  void,
  { rejectValue: string }
>("achievements/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Achievement[]>(API);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});
