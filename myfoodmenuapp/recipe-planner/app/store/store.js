import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import savedReducer from "./savedSlice";
import plannerReducer from "./plannerSlice";
import { mealApi } from "./mealApi";

const rootReducer = combineReducers({
  saved: savedReducer,
  planner: plannerReducer,
  [mealApi.reducerPath]: mealApi.reducer,
});

const persisted = persistReducer(
  { key: "root", storage, whitelist: ["saved", "planner"] },
  rootReducer
);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }).concat(mealApi.middleware),
});

export const persistor = persistStore(store);
