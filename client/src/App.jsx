import React from 'react'
import "./App.css"
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import NotesPage from './pages/NotesPage'
import FlashcardsPage from './pages/FlashcardsPage'
import CalendarPage from './pages/CalendarPage'

const App = () => {
  return(
    <div className='App'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/tasks' element={<TasksPage/>}/>
        <Route path='/notes' element={<NotesPage />}/>
        <Route path='/calendar' element={<CalendarPage/>}/>
        <Route path='/flashcards' element={<FlashcardsPage/>}/>
      </Routes>
    </div>
  )
}

export default App