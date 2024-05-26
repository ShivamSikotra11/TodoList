import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "../reducers/taskReducer";
import { useUserContext } from "./userContext";
// import stocksJSON from "../stockNames.json";
// import ibmData from "../ibmJSON.json";
const initialItems = {
  userTasks: [],
  curStockFetching: false,
  selectStockLoading: false,
  allStockData: [],
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItems);
  const { url, getUser } = useUserContext();

  const data = [];
 

  const getTasks = async (userData) => {
    try {
      const res = await axios.post(`${url}tasks/`, {
        email: userData.email,
      });
      // console.log(res.data);
      dispatch({ type: "ADD_ALL_TASKS", payload: res.data });
    } catch (e) {
      console.log(e); 
    }
  };

  const AddTask = async (task) => {
    try {
      const res = await axios.post(`${url}tasks/add_task/`, task);
      dispatch({ type: "ADD_TASK", payload: task });
    } catch (e) {
      console.log(e);
    }
  };
  const updateTask = async (taskID,updatedTask) => {
    try {
      const user = getUser();
      const response = await axios.put(`${url}tasks/${taskID}`,  {email:user.email,task:updatedTask});
      dispatch({ type: "UPDATE_TASK", payload: {id:taskID,updatedTask} });
      
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const DeleteTask = async (taskId) => {
    try {
      const user = getUser();
      // console.log(user);
      const res = await axios.delete(`${url}tasks/${taskId}`, { 
        data: { email: user.email } 
      });
      dispatch({ type: "REMOVE_TASK", payload: taskId });
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        AddTask,
        DeleteTask,
        getTasks,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
const useTaskContext = () => {
  return useContext(TaskContext);
};
export { useTaskContext };
export default TaskProvider;
