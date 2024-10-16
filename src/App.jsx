import React from 'react'
import { useState } from 'react'
import "./App.css"

const App = () => {

  const [addTask, setAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const toggleForm = () => {
    setAddTask(prev => !prev)
  }

  const updateTaskInput = (e) => { setTaskInput(e.target.value)}

  const handleAddTask = (e) => {
    e.preventDefault()
    const newTask = {
      title: e.target.title.value,
      deadline: e.target.deadline.value,
      color: e.target.color.value
    }

    setTasks(prev => [...prev, newTask])
    setTaskInput('')
  }

  return(
    <>
      <header>
        <h1>Tasks for Today</h1>

      </header>
      <main>
        <ul className='todo-list'>
          { 
            tasks.map((task, index) => (
              <li key={"task-" + index} style={{"--color": task.color}}>
                <span>{task.title}</span>
                <span>{task.deadline}</span>
              </li>
            ))
          }
        </ul>
        { addTask && 
        <form onSubmit={handleAddTask}>
          <input onChange={updateTaskInput} value={taskInput} type="text" placeholder='Enter Task' name='title'/>
          <br />
          <div className="footer">
            <input type="time" name='deadline'/>
            <input value="#7C62FE" type="color" name='color'/>
            <button onClick={toggleForm}>Cancel</button>
            <button className='accent-button' type='submit'>Add</button>
          </div>
        </form>}

        {!addTask && <button className='add-button' onClick={toggleForm}>+</button>}
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App