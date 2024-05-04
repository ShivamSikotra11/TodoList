import { configureStore } from "@reduxjs/toolkit";
import TasksSlice from "./tasks";

const TasksStore = configureStore({
  reducer:{
    tasks:TasksSlice.reducer,
  }
})

export default TasksStore;