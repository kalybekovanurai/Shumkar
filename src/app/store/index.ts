import { persistStore } from "redux-persist";
import { store } from "./store";

export const persistor = persistStore(store);

export type { RootState, AppDispatch } from "./store";