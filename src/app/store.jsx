import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import filterReducer from '../features/filterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
// import storage from "redux-persist/lib/storage" //? local storage
import storage from "redux-persist/lib/storage/session" //? session storage

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    filters: filterReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

export default store
