import React, { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { TasksActions } from "../store/tasks";
import { MdClose } from "react-icons/md";


const TodoTasks = () => {
  const taskRef = useRef();
  const dispatch = useDispatch();
  
  const { allTasks } = useSelector((store) => store.tasks);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (showForm) {
      taskRef.current.focus();
    }
  }, [showForm]);
  const handleAddTask = () => {
    dispatch(TasksActions.addTask({ task: taskRef.current.value, isCompleted: false }));
    setShowForm(false);
    taskRef.current.value = "";
  };
  return (
    <>
      <div className="  pb-6 bg-white" >
        <div className="   overflow-y-scroll min-h-[5rem] max-h-[15rem] custom-scrollbar bg-white p-4 pb-4 space-y-1 pl-8 font-poppin">
          {allTasks.map((item, index) => (
            <TodoItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center    relative h-[3rem]">
      <button
          className={`bg-primary text-xl font-medium font-poppin py-2 px-8 rounded-[2rem] text-white text-center absolute -top-[50%] ${showForm ? 'hidden' : ''}`}
          onClick={() => setShowForm(!showForm)}
          disabled={showForm} 
        >
          + New task
        </button>
        {showForm && (
          <div className="absolute flex justify-between items-center top-[1rem] bg-white   px-4 py-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter task"
            className="border-2 border-primary focus:border-primary p-2 w-[90%] "
            ref={taskRef}
          />
          <button
            onClick={handleAddTask}
            className="border bg-primary text-white font-medium py-1 px-2 rounded-md"
          >
            +
          </button>
          <button className="absolute top-0 right-0" onClick={() => setShowForm(false)}>
            <MdClose />
          </button>
        </div>
        )}
      </div>
    </>
  );
};

export default TodoTasks;
