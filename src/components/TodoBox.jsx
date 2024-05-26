// import React from 'react'
// import TodoHeader from './TodoHeader'
// import TodoTasks from './TodoTasks'

// const TodoBox = () => {
//   return (
//     <div className='w-[25rem] border  max-[425px]:w-[20rem] max-[325px]:w-[18rem]' >
//       <TodoHeader/>
//       <TodoTasks/>
//     </div>
//   )
// }

// export default TodoBox
import React,{useEffect} from 'react'
import TodoHeader from './TodoHeader'
import TodoTasks from './TodoTasks'
import { useTaskContext } from "../store/taskContext";
import { useUserContext } from "../store/userContext";


const TodoBox = () => {
  const { userTasks } = useTaskContext();
  const { loggedIn } = useUserContext();

  useEffect(()=>{
    // console.log("tasks chanegs");
  }, [userTasks,loggedIn]);
  
  return (
    <div className='max-[425px]:w-[20rem] max-[325px]:w-[18rem]' >
      <TodoTasks/>
    </div>
  )
}

export default TodoBox