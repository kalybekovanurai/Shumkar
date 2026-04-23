import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Leader } from "./types";
import { axiosInstance } from "../../../shared/configs/axiosInstance";

const API = "/leaders/";

export const getLeaders = createAsyncThunk<
  Leader[],
  void,
  { rejectValue: string }
>("leaders/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Leader[]>(API);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error fetching leaders",
    );
  }
});
