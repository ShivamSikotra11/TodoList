import React from 'react'
import TodoHeader from './TodoHeader'
import TodoTasks from './TodoTasks'

const TodoBox = () => {
  return (
    <div className='w-[25rem] max-[425px]:w-[20rem] max-[325px]:w-[18rem]' >
      <TodoHeader/>
      <TodoTasks/>
    </div>
  )
}

export default TodoBox