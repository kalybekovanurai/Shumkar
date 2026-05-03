import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Module } from "./types";
import { axiosInstance } from "../../shared/api/axiosInstance";

const API = "/modules/";

export const getModules = createAsyncThunk<
  Module[],
  void,
  { rejectValue: string }
>("modules/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Module[]>(API);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error fetching modules",
    );
  }
});
