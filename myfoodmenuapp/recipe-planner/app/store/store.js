import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import savedReducer from "./savedSlice"
import { mealApi } from "./mealApi";

const rootReducer = combineReducers({
     saved:savedReducer,
    [mealApi.reducerPath]: mealApi.reducer,
});
const persisted = persistReducer(
    {key: "root", storage, whitelist:
        ["saved"]},
        rootReducer
    );

export const store = configureStore({
    reducer: persisted,
    middleware:(getDefault) =>
        getDefault({serializableCheck: false}).concat(mealApi.middleware),
});

export const persistor =
persistStore(store);
