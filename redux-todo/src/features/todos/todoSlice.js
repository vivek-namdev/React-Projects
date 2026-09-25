import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",

  initialState,

  reducers: {
    // CREATE
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },

    // DELETE
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },

    // UPDATE
    updateTodo: (state, action) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );

      if (todo) {
        todo.text = action.payload.text;
      }
    },

    // TOGGLE COMPLETE / INCOMPLETE
    toggleTodo: (state, action) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} = todoSlice.actions;

export default todoSlice.reducer;