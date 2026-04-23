import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import type { AuthUser } from "./auth";
import { auth } from "../../../shared/configs/firebase";

export const signInWithGoogle = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: string }
>("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      uid: user.uid,
      name: user.displayName || "Без имени",
      email: user.email || "",
      photoURL: user.photoURL || "",
    };
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка входа через Google");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка выхода");
    }
  },
);
