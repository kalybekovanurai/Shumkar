import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import progressReducer from "./slices/progressSlice";

interface RootState {
  player: ReturnType<typeof playerReducer>;
  progress: ReturnType<typeof progressReducer>;
}

const loadState = (): RootState | undefined => {
  try {
    const saved = localStorage.getItem("redux");
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    localStorage.setItem("redux", JSON.stringify(state));
  } catch {}
};

export const store = configureStore({
  reducer: {
    player: playerReducer,
    progress: progressReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
