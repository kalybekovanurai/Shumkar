import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProgressResponse } from "./types";
import { axiosInstance } from "../../../shared/configs/axiosInstance";

const API = "/progress";

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

  return error.message || "Error fetching progress";
};

export const getProgressByUserId = createAsyncThunk<
  ProgressResponse,
  number,
  { rejectValue: string }
>("progress/getByUserId", async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<ProgressResponse>(
      `${API}/${userId}`,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});
