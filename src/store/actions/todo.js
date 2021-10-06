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
