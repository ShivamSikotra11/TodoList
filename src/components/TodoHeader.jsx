import React from 'react'
import { useUserContext } from '../store/userContext';

const TodoHeader = () => {
  const {loggedIn,getLogOut} = useUserContext();         
  return (
    <div className='flex justify-between items-center px-8 font-sora  bg-primary py-4 '>
      <div className=' text-white  text-center  text-3xl font-semibold' >
        Todo List
      </div>
     
      <div className='flex  space-x-4' >
        <div className="text-white text-xl" onClick={getLogOut} >LogOut</div>
        <div className="text-white text-xl">Shivam</div>
      </div>
 
    </div>
  )
}

export default TodoHeader