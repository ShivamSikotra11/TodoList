import { createSlice } from "@reduxjs/toolkit";

// Retrieve tasks from localStorage or use default tasks
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const initialState = {
  allTasks: storedTasks
    ? storedTasks
    : [],
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
    markComplete: (state, action) => {
      const taskIndex = action.payload;
      // if (taskIndex !== -1) {
        state.allTasks[taskIndex].isCompleted = !state.allTasks[taskIndex].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(state.allTasks));
      // }
    },
    deleteTask: (state, action) => {
      state.allTasks = state.allTasks.filter((task, index) => index !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
    updateTask: (state, action) => {
      const { index, updatedTask } = action.payload;
      if (index >= 0 && index < state.allTasks.length) {
        state.allTasks[index] = { ...state.allTasks[index], ...updatedTask };
        localStorage.setItem("tasks", JSON.stringify(state.allTasks));
      }
    },
    
  },
});

export default TasksSlice;
export const TasksActions = TasksSlice.actions;
