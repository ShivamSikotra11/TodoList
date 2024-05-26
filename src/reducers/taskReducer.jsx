const stockReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const { email, ...task } = action.payload;
      return {
        ...state,
        userTasks: [...state.userTasks,task]
      };
    case "ADD_ALL_TASKS":
      return {
        ...state,
        userTasks: action.payload,
      };
    case "REMOVE_TASK":
      // console.log(action.payload);
      return {
        ...state,
        userTasks: state.userTasks.filter(task => task._id !== action.payload)
      };
    case "UPDATE_TASK":
      // console.log(action.payload);
      const { id, updatedTask } = action.payload;
      // console.log(id, updatedTask);
      return {
        ...state,
        userTasks: state.userTasks.map(task => 
          task._id === id ? { ...task, ...updatedTask } : task
        ),
      };
    case "ALTER_CURR_TASK_FETCHING":
      return {
        ...state,
        curStockFetching:!state.curStockFetching,
      }
    case "ALTER_SELECT_TASK_LOADING":
      return {
        ...state,
        selectStockLoading:!state.selectStockLoading,
      }
    default:
      return state;
  }
};

export default stockReducer;
