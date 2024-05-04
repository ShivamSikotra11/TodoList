import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { TasksActions } from '../store/tasks';
import { useDispatch, useSelector } from 'react-redux';

const TodoItem = ({ item,index }) => {
  
  const isCompleted = item.isCompleted;

  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(TasksActions.markComplete(index));
  };
  const handleDelete = () => {
    dispatch(TasksActions.deleteTask(index));
  };

  return (
    <div className="flex items-center py-1 w-full ">
      <span
        className={`w-3 h-3 rounded-full border border-gray ${isCompleted ? 'bg-purple-300' : 'bg-[#f9fcff]'} mr-2 cursor-pointer`}
        onClick={handleToggleComplete}
      ></span>
      <div className={`text-xl text-black font-medium ${isCompleted ? 'line-through' : ''} flex-grow  break-words w-[85%] `}>{item.task}</div>
      <MdDeleteOutline size={23} color="gray" className='cursor-pointer' onClick={handleDelete} />
    </div>
  );
};

export default TodoItem;
