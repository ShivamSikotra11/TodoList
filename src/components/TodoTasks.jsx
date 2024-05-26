// import React, { useEffect, useRef, useState } from "react";
// import TodoItem from "./TodoItem";
// import { useDispatch, useSelector } from "react-redux";
// import { TasksActions } from "../store/tasks";
// import { MdClose } from "react-icons/md";

// const TodoTasks = () => {
//   const taskRef = useRef();
//   const dispatch = useDispatch();

//   const { userTasks } = useSelector((store) => store.tasks);
//   const [showForm, setShowForm] = useState(false);
//   useEffect(() => {
//     if (showForm) {
//       taskRef.current.focus();
//     }
//   }, [showForm]);
//   const handleAddTask = () => {
//     dispatch(TasksActions.addTask({ task: taskRef.current.value, isCompleted: false }));
//     setShowForm(false);
//     taskRef.current.value = "";
//   };
//   return (
//     <>
//       <div className="  pb-6 bg-white" >
//         <div className="   overflow-y-scroll min-h-[5rem] max-h-[15rem] custom-scrollbar bg-white p-4 pb-4 space-y-1 pl-8 font-poppin">
//           {userTasks.map((item, index) => (
//             <TodoItem key={index} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center    relative h-[3rem]">
//       <button
//           className={`bg-primary text-xl font-medium font-poppin py-2 px-8 rounded-[2rem] text-white text-center absolute -top-[50%] ${showForm ? 'hidden' : ''}`}
//           onClick={() => setShowForm(!showForm)}
//           disabled={showForm}
//         >
//           + New task
//         </button>
//         {showForm && (
//           <div className="absolute flex justify-between items-center top-[1rem] bg-white   px-4 py-4 w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Enter task"
//             className="border-2 border-primary focus:border-primary p-2 w-[90%] "
//             ref={taskRef}
//           />
//           <button
//             onClick={handleAddTask}
//             className="border bg-primary text-white font-medium py-1 px-2 rounded-md"
//           >
//             +
//           </button>
//           <button className="absolute top-0 right-0" onClick={() => setShowForm(false)}>
//             <MdClose />
//           </button>
//         </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TodoTasks;

import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { TasksActions } from "../store/tasks";
import { MdClose } from "react-icons/md";
import Backdrop from "@mui/material/Backdrop";
import Draggable from "react-draggable";
import { useTaskContext } from "../store/taskContext";
import { useUserContext } from "../store/userContext";

const TodoTasks = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const dueDateRef = useRef();
 

   
  const { AddTask,userTasks } = useTaskContext();
  const { getUser } = useUserContext();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      titleRef.current.focus();
    }
  }, [showForm]);

  const getCurrentDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = `0${dd}`;
    }
  
    if (mm < 10) {
      mm = `0${mm}`;
    }
  
    return `${yyyy}-${mm}-${dd}`;
  };
  
  
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      dueDate: dueDateRef.current.value,
    };
    const user = getUser();
    AddTask({ ...task, email: user.email });
    setShowForm(false);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    statusRef.current.value = "pending";
    dueDateRef.current.value = "";
  };

  const pendingTasksCount = userTasks.filter(
    (task) => task.status === "pending"
  ).length;

 
  return (
    <div className="px-6">
      <div className=" flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-medium font-poppin">
          {pendingTasksCount === 0 ? (
            userTasks.length === 0 ? (
              <>No Tasks</>
            ) : (
              <>No Pending Tasks</>
            )
          ) : (
            <>{pendingTasksCount} Pending Tasks</>
          )}
        </h1>

        <button
          className={`bg-primary text-xl font-medium font-poppin py-2 px-8 rounded-[2rem] text-white text-center ${
            showForm ? "hidden" : ""
          }`}
          onClick={() => setShowForm(!showForm)}
          disabled={showForm}
        >
          + New task
        </button>
      </div>

      <div className="pb-6 bg-white">
        <div className="overflow-y-scroll min-h-[5rem] max-h-[90vh] custom-scrollbar bg-white p-4 pb-4 space-y-1 pl-8 font-poppin">
          {userTasks.map((item, index) => (
            <TodoItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showForm}
      >
        {/* <Draggable> */}
          {/* <form onSubmit={handleAddTask}> */}
            <form onSubmit={handleAddTask} className="absolute flex flex-col bg-white px-4 pt-4 w-full max-w-md">
              <button
                className="text-black text-xl absolute right-0 top-0 mr-1 mt-1"
                onClick={() => setShowForm(false)}
              >
                <MdClose />
              </button>
              <input
                type="text"
                placeholder="Enter title"
                required
                className="border-2 border-primary text-black focus:text-primary focus:border-primary p-2 mb-2 mt-3"
                ref={titleRef}
              />
              <textarea
                placeholder="Enter description"
                required
                className="border-2 border-primary focus:border-primary text-black focus:text-primary p-2 mb-2"
                ref={descriptionRef}
              ></textarea>
              <select
                className="border-2 border-primary focus:border-primary text-black focus:text-primary p-2 mb-2"
                ref={statusRef}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-progress</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="date"
                required
                className="border-2 border-primary focus:border-primary text-black focus:text-primary p-2 mb-2"
              ref={dueDateRef}
              min={getCurrentDate()}
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="border bg-primary text-white font-medium text-lg py-1 px-2 rounded-lg mb-2"
                >
                  + Add
                </button>
              </div>
            {/* </div> */}
          </form>
        {/* </Draggable> */}
      </Backdrop>
    </div>
  );
};

export default TodoTasks;
