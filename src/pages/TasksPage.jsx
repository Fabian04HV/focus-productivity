import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import apiClient from '../../api/apiClient'

const TasksPage = () => {
  const [addTask, setAddTask] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [taskColor, setTaskColor] = useState('#7C62FE')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks')
        const tasks = response.data
        setTasks(tasks)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    };
  
    fetchTasks()
  }, [])

  const toggleForm = () => {
    setAddTask(prev => !prev)
  }

  const updateInput = (e) => {
    setTaskInput(e.target.value)
  }

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

  const handleDeleteTask = (index) =>{
    setTasks(prev => prev.filter((e, i) => i !== index))
  }

  const handleColorChange = (e) => { 
    setTaskColor(e.target.value)
  }

  return (
    <main className='TasksPage'>
      <header>
        <h1>Tasks for Today</h1>
      </header>
      <section>
        <ul className='todo-list'>
          { 
            tasks.map((task, index) => (
              <li key={"task-" + index} style={{"--color": task.color}}>
                <p>{task.title}</p>
                <p>
                  <span className='deadline'>{task.deadline}</span>
                  <button onClick={() => handleDeleteTask(index)} className='delete-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>
                  </button>
                </p>
              </li>
            ))
          }
          {!addTask && <button className='add-button' onClick={toggleForm}>+</button>}
          { addTask && 
            <form onSubmit={handleAddTask}>
              <div className="header">
                <input onChange={handleColorChange} type="color" name='color' value={taskColor}/>
                <input required type="text" onChange={updateInput} value={taskInput} placeholder='Enter Task' name='title'/>
              </div>
              
              <div className="footer">
                <input type="time" name='deadline'/>
                <button className='accent-button' type='submit'>Add</button>
                <button onClick={toggleForm}>Cancel</button>
              </div>
          </form>}
        </ul>
        

        
      </section>
    </main>
  )
}

export default TasksPage