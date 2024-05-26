import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { TasksActions } from "../store/tasks";
import { useDispatch } from "react-redux";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useTaskContext } from "../store/taskContext";

const TodoItem = ({ item, index }) => {
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const { _id, title, description, status, dueDate } = item;
  const [isEditing, setIsEditing] = useState(false);
  const {DeleteTask,updateTask} = useTaskContext(); 
  const [editFields, setEditFields] = useState({
    title,
    description,
    status,
    dueDate:formatDate(dueDate),
  });

  const getColor = (val) => {
    if (val === 'completed') return "success";
    if (val === 'in-progress') return "warning";
    return "error";
  }

  const dispatch = useDispatch();

   
  const handleDelete = () => {
    DeleteTask(_id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // console.log("edit");
    updateTask(_id, {...editFields,_id});
    setIsEditing(false);
  };

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
  
  

  return (
    <div className="flex items-center py-1 w-full ">
      {isEditing ? (
        <div className="flex flex-col space-y-3 border border-primary py-2 w-full" >
          <div className='flex justify-between items-center pt-4 px-[1%]  ' >
            <TextField
              label="Title"
              variant="standard"
              value={editFields.title}
              onChange={(e) =>
                setEditFields({ ...editFields, title: e.target.value })
              }
              sx={{
                "& .MuiInput-underline:before": { borderBottomColor: '#af7eeb' },
                "& .MuiInput-underline:after": { borderBottomColor: '#af7eeb' },
                "& .MuiInputLabel-root.Mui-focused": { color: '#af7eeb' },
              }}
              className="mr-2 w-[18%]"
            />
            <TextField
              label="Description"
              variant="standard"
              value={editFields.description}
              onChange={(e) =>
                setEditFields({ ...editFields, description: e.target.value })
              }
              sx={{
                maxHeight: '5rem',
                overflowY: 'auto',
                "& .MuiInput-underline:before": { borderBottomColor: '#af7eeb' },
                "& .MuiInput-underline:after": { borderBottomColor: '#af7eeb' },
                "& .MuiInputLabel-root.Mui-focused": { color: '#af7eeb' },
              }}
              multiline
              className="mr-2 w-[78%] custom-scrollbar"
            />
          </div>
          <div className='flex items-center px-[1%] ' >
            <TextField
              label="Status"
              variant="standard"
              select
              SelectProps={{
                native: true,
              }}
              value={editFields.status}
              onChange={(e) =>
                setEditFields({ ...editFields, status: e.target.value })
              }
              sx={{
                "& .MuiInput-underline:before": { borderBottomColor: '#af7eeb' },
                "& .MuiInput-underline:after": { borderBottomColor: '#af7eeb' },
                "& .MuiInputLabel-root.Mui-focused": { color: '#af7eeb' },
              }}
              className="mr-2 w-[18%] "
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </TextField>
            <TextField
              label="Due Date"
              variant="standard"
              type="date"
              min={getCurrentDate()}
              value={editFields.dueDate}
              onChange={(e) =>
                setEditFields({ ...editFields, dueDate: e.target.value })
              }
              sx={{
                marginLeft: '4%',
                "& .MuiInput-underline:before": { borderBottomColor: '#af7eeb' },
                "& .MuiInput-underline:after": { borderBottomColor: '#af7eeb' },
                "& .MuiInputLabel-root.Mui-focused": { color: '#af7eeb' },
              }}
              className="mr-2 w-[18%]"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <button
              onClick={handleSaveEdit}
              className="border bg-primary text-white font-medium py-1 px-2 rounded-md ml-[4%] "
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className='border border-primary p-2 flex items-center justify-between w-full' >
          <div
              className={`text-2xl text-black flex-grow break-words w-[85%] `}
          >
            <div className="font-medium font-sora capitalize">{title}</div>
            <div className="text-lg pl-2 max-h-[7rem] overflow-y-scroll custom-scrollbar break-words">{description}</div>
            <div className="flex justify-between items-center px-8" >
              <div className="text-lg pl-2">Due on: <span className='font-medium font-outfit' >{formatDate(dueDate)}</span></div>
                <Chip label={status} color={getColor(status)} className='capitalize' />
            </div>
          </div>
          <MdEdit
            size={23}
            color="gray"
            className="cursor-pointer mx-2 "
            onClick={handleEdit}
          />
          <MdDeleteOutline
            size={23}
            color="gray"
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
