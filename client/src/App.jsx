import React, { useState } from 'react'
import "./App.css"
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import NotesPage from './pages/NotesPage'
import FlashcardsPage from './pages/FlashcardsPage'
import CalendarPage from './pages/CalendarPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { LandingPage } from './pages/LandingPage'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return(
    <div className='App'>
      { isLoggedIn && <Sidebar/> }
      <Routes>
        { isLoggedIn ? 
        <>
          <Route path='/' element={<DashboardPage/>}/>
          <Route path='/tasks' element={<TasksPage/>}/>
          <Route path='/notes' element={<NotesPage />}/>
          <Route path='/calendar' element={<CalendarPage/>}/>
          <Route path='/flashcards' element={<FlashcardsPage/>}/>
        </>:
        <>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
        </>
        }      
      </Routes>
    </div>
  )
}

export default App