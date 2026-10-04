import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import savedReducer from "./savedSlice"

const rootReducer = combineReducers({ saved:
    savedReducer
});
const persisted = persistReducer({key: "root", storage}, rootReducer);

export const store = configureStore({
    reducer: persisted,
    middleware:(getDefault) =>
        getDefault({serializableCheck: false})
});

export const persistor =
persistStore(store);
