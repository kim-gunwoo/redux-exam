# React Todo Redux Exam

## Get start

```
$ npm install
$ npm start
```

## 리덕스 사용법

### 리덕스

- 라이브러리 다운로드

```
// 리덕스 라이브러리 다운로드
// 리덕스 개발툴 적용
// 리덕스 스토리지
$ npm install redux react-redux
$ npm install redux-devtools-extension
$ npm install redux-persist
```

- 리덕스 App에 적용하기

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "App";
import store from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

- store 만들기

```js
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "store/reducers";

// const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools()); // redux devtool 적용

export default store;
```

- rootReducer 만들기

```js
import { combineReducers } from "redux";
import todoReducer from "./todo";

const rootReducer = combineReducers({ todo: todoReducer });

export default rootReducer;
```

- action 생성

```js
import {
  TODO_INSERT,
  TODO_REMOVE,
  TODO_UPDATE,
  TODO_TOGGLE,
} from "store/reducers/todo";

// 액션 함수
export const todoInsert = (text) => {
  return {
    type: TODO_INSERT,
    payload: {
      text: text,
      done: false,
    },
  };
};
export const todoRemove = (id) => {
  return {
    type: TODO_REMOVE,
    payload: { id: id },
  };
};
export const todoUpdate = (id, text) => {
  return {
    type: TODO_UPDATE,
    payload: { id: id, text: text },
  };
};
export const todoToggle = (id) => {
  return {
    type: TODO_TOGGLE,
    payload: { id: id },
  };
};
```

- reduces 생성

```js
// 초기 데이터
const INITIAL_STATE = {
  todos: [
    {
      id: 1,
      text: "첫번째",
      done: false,
    },
  ],
};

// 리듀서 생성
// export default function todoReducer(state = INITIAL_STATE, action) {
export default function todoReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case TODO_INSERT:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Math.max(0, ...state.todos.map((todo) => Number(todo.id))) + 1,
            text: payload.text,
            done: false,
          },
        ],
      };
    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    case TODO_UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, text: payload.text } : todo
        ),
      };
    case TODO_TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    default:
      return state;
  }
}

// 액션정의
export const TODO_INSERT = "TODO/INSERT";
export const TODO_REMOVE = "TODO/REMOVE";
export const TODO_UPDATE = "TODO/UPDATE";
export const TODO_TOGGLE = "TODO/TOGGLE";
```

- 컴포넌트에 리덕스 적용하기

```js
import { useSelector, useDispatch } from "react-redux";
import { todoInsert } from "store/actions/todo";

export default function Components() {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(todoInsert({ payload }));
  };
}
```

### 리덕스 스토리지 (redux-persist)

- App에 persist 적용하기

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "App";
import { store, persistor } from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

- store 에 persist 적용하기

```js
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "store/reducers";

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
```

### 리덕스 툴킷

- 라이브러리 다운로드

```
// 리덕스 라이브러리 다운로드
$ npm install @reduxjs/toolkit react-redux
```

- App 에 적용하기

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "App";
import store from "app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

- app/store 파일 configureStore 적용하기

```js
// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});
```

- features 폴더에 Slice 생성하기

```js
// features/todo/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  todos: [{ id: 1, text: "첫번째", done: false }],
};

export const slice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    todoInsert: (state, action) => {
      const insertId =
        Math.max(0, ...state.todos.map((todo) => Number(todo.id))) + 1;
      const insertText = action.payload;
      state.todos.push({ id: insertId, text: insertText, done: false });
    },
    todoRemove: (state, action) => {
      const deleteId = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === deleteId);
      state.todos.splice(index, 1);
    },
    todoUpdate: (state, action) => {
      const { id: updateId, text: updateText } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updateId);
      state.todos[index].text = updateText;
    },
    todoToggle: (state, action) => {
      const toggleId = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === toggleId);
      state.todos[index].done = !state.todos[index].done;
    },
  },
});

export const { todoInsert, todoRemove, todoUpdate, todoToggle } = slice.actions;

export const selectTodo = (state) => state.todo;
export const selectTodos = (state) => state.todo.todos;

export default slice.reducer;
```

- 컴포넌트에서 사용하기

```js
import { useSelector, useDispatch } from "react-redux";
import { todoInsert } from "./todoSlice";
import { selectTodo, selectTodos } from "./todoSlice";

export default function Components() {
  1. const { todos } = useSelector((state) => state.todo);
  2. const { todos } = useSelector(selectTodo);
  3. const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(todoInsert({ payload }));
  };
}
```
