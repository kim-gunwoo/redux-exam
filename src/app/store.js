// import { configureStore } from "@reduxjs/toolkit";
// import todoSlice from "features/todo/todoSlice";

// export const store = configureStore({
//   reducer: {
//     todo: todoSlice,
//   },
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import todoSlice from "features/todo/todoSlice";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage: storage,
  // 여러개의 reducer 중에 todo reducer만 localstorage에 저장합니다.
  whitelist: ["todo"],
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({ todo: todoSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
export const persistor = persistStore(store);
