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
