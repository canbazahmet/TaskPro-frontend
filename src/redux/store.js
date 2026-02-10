import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";

// Import reducers here
// import { authReducer } from "./auth/slice.js";
// import { boardsReducer } from "./boards/slice.js";

// const persistConfig = {
//   key: "root",
//   storage,
//   // whitelist: ["auth", "boards"],
// };

// Create store with reducers
const store = configureStore({
  reducer: {
    // auth: persistReducer(persistConfig, authReducer),
    // boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
