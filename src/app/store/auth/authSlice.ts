import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Shumkar from "../../../assets/images/happyShumkar.png";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  photoURL: string;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
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
});

export const { updateUserName, logoutUser, loginFakeUser } = authSlice.actions;
export default authSlice.reducer;
