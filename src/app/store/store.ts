import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import playerReducer from "./player/playerSlice";
import progressReducer from "./progress/progressSlice";
import authReducer from "./auth/authSlice";
import modulesReducer from "./modules/modulesSlice";
import leadersReducer from "./leaders/leadersSlice";
import lessonReducer from "./lesson/lessonSlice";
import levelReducer from "./level/levelSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  progress: progressReducer,
  auth: authReducer,
  modules: modulesReducer,
  leaders: leadersReducer,
  lesson: lessonReducer,
  level: levelReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "progress", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
