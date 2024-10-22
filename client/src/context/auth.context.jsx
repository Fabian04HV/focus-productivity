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

  const authenticateUser = () =>{
    const storedToken = localStorage.getItem('authToken')

    if(storedToken){
      apiClient.get('/user', { headers: { Authorization: `Bearer ${storedToken}` }})
      .then(response => {
        // If the server verifies that the JWT token is valid
        const user = response.data.user
        console.log('User from payload: ', user)
        
        setIsLoggedIn(true)
        setIsLoading(false)
        setUser(user)
      })
      .catch(error => {
        // If the server send an error response (invalid token)
        setIsLoggedIn(false)
        setIsLoading(false)
        setUser(null)
      })
    } else{
      // If the token is not available or removed
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }