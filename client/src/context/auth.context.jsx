import React, { useState } from 'react'
import apiClient from '../../api/apiClient'

const AuthContext = React.createContext()

function AuthProviderWrapper(props){

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)

  const storeToken = (token) => {
    localStorage.setItem('authToken', token)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }