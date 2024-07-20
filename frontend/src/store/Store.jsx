import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ThemeReducer from "./theme/ThemeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: ThemeReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(Store);
