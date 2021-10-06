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
