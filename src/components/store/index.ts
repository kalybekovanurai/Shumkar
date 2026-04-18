import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import progressReducer from "./slices/progressSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import { combineReducers } from "redux";

// 🔥 объединяем reducer
const rootReducer = combineReducers({
  player: playerReducer,
  progress: progressReducer,
});

// 🔥 конфиг persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "progress"], // что сохраняем
};

// 🔥 оборачиваем reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔥 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // важно для redux-persist
    }),
});

// 🔥 persistor
export const persistor = persistStore(store);

// 🔥 типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
