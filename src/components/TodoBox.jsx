import React from 'react'
import TodoHeader from './TodoHeader'
import TodoTasks from './TodoTasks'

const TodoBox = () => {
  return (
    <div className='w-[25rem] ' >
      <TodoHeader/>
      <TodoTasks/>
    </div>
  )
}

export default TodoBox