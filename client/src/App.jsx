import React, { useContext, useState } from 'react'
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
import { AuthContext } from './context/auth.context'
import { Navigate } from 'react-router-dom'

const App = () => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { isLoggedIn, isLoading } = useContext(AuthContext)
  
  if(isLoading) {
    return (
      <div className='loading-spinner'>Loading.....</div>
    )
  }
  console.log("isLoggedIn: ", isLoggedIn)

  return(
    <div className='App'>
      {isLoggedIn && <Sidebar />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/notes' element={<NotesPage />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/flashcards' element={<FlashcardsPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        )}
    </Routes>
    </div>
  )
}

export default App