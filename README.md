# React Todo Template

## Get start

```
$ npm install
$ npm start
```

## 리덕스 사용법

- 라이브러리 다운로드

```
// 리덕스 라이브러리 다운로드
// 리덕스 개발툴 적용
$ npm install redux react-redux
$ npm install redux-devtools-extension
```

- 리덕스 App에 적용하기

```js
import { Provider } from "react-redux";
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
