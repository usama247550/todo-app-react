import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = [];
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      const todoExist = state.find((todo) => todo.text === action.payload);
      if (todoExist) {
        toast.error("Item already exist");
      } else {
        state.push(todo);
      }
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoEdit = state.find((todo) => todo.id === id);
      if (todoEdit) {
        todoEdit.text = text;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    removeAllTodo: () => {
      return [];
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, toggleComplete, editTodo, removeTodo, removeAllTodo } =
  todoSlice.actions;
