import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./slices/userSlice"; // Adjust the path as needed

// Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Store Configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable to avoid Redux-Persist serialization warnings
    }),
});

// Persistor
const persistor = persistStore(store);

// Exports
export default store; // Default export
export { persistor }; // Named export
