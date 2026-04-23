import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthUser } from "./authSlice";
import Shumkar from "../../../assets/images/happyShumkar.png";

export const loginUser = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: string }
>("auth/loginUser", async (_, { rejectWithValue }) => {
  try {
    const fakeUser: AuthUser = {
      id: 1,
      name: "Алиса",
      email: "alisa@example.com",
      photoURL: Shumkar,
    };

    return fakeUser;
  } catch (error) {
    return rejectWithValue("Не удалось выполнить вход");
  }
});
