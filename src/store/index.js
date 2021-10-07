import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "store/reducers";

// const store = createStore(rootReducer, composeWithDevTools());
// export default store;

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage: storage,
  // 여러개의 reducer 중에 todo reducer만 localstorage에 저장합니다.
  whitelist: ["todo"],
  // blacklist -> 그것만 제외합니다
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
