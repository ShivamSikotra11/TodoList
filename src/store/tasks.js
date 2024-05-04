import { createSlice } from "@reduxjs/toolkit";

// Retrieve tasks from localStorage or use default tasks
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const initialState = {
  allTasks: storedTasks
    ? storedTasks
    : [
        { task: "To Workout", isCompleted: false },
        { task: "Going Gym", isCompleted: false },
        { task: "Doing Yoga", isCompleted: false },
        { task: "Meditation", isCompleted: false },
        { task: "Reading Books", isCompleted: false },
      ],
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
  },
});

export default TasksSlice;
export const TasksActions = TasksSlice.actions;
