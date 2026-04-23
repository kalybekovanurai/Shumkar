import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Shumkar from "../../../assets/images/happyShumkar.png";
import { loginUser } from "./authThunk";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  photoURL: string;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading?: boolean;
  error?: string | null;
};

const fakeUser: AuthUser = {
  id: 1,
  name: "Алиса",
  email: "alisa@example.com",
  photoURL: Shumkar,
};

const initialState: AuthState = {
  user: fakeUser,
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload.trim();
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    loginFakeUser: (state) => {
      state.user = fakeUser;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка входа";
      });
  },
});

export const { updateUserName, logoutUser, loginFakeUser } = authSlice.actions;
export default authSlice.reducer;
