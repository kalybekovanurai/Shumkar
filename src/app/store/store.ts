import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import playerReducer from "../../entities/player/playerSlice";
import progressReducer from "../../entities/progress/progressSlice";
import authReducer from "../../features/auth/authSlice";
import modulesReducer from "../../entities/modules/modulesSlice";
import leadersReducer from "../../entities/leaders/leadersSlice";
import lessonReducer from "../../entities/lesson/lessonSlice";
import levelReducer from "../../entities/level/model/levelSlice";
import achievementsReducer from "../../features/achievements/achievementsSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  progress: progressReducer,
  auth: authReducer,
  modules: modulesReducer,
  leaders: leadersReducer,
  lesson: lessonReducer,
  level: levelReducer,
  achievements: achievementsReducer,
});

const persistConfig = {
  key: "shumkar",
  storage,
  whitelist: ["player", "progress", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
