import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'
import apiClient from "../../api/apiClient"

export const SignupPage = () => {

  const [formData, setFormData] = useState({ firstname: "", email: "", password: "" })
  const [isFormValid, setIsFormValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  useEffect(() => {
    const isValid = 
      formData.firstname.trim() !== "" &&
      formData.email.trim() !== "" &&
      passwordRegex.test(formData.password);
    setIsFormValid(isValid)
  }, [formData, passwordRegex])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    setErrorMessage('')
  }
  const handleSignup = (e) => {
    e.preventDefault()

    if(!isFormValid){
      setErrorMessage('Please fill in all fields correctly')
      return;
    }

    apiClient.post('/signup', formData)
    .then(response => {
      console.log('Signup Response: ', response)
    })
    .catch(error => {
      setErrorMessage(error.response.data.message)
    })
  }

  const handleSignupClick = () => {
    if(!isFormValid){
      setErrorMessage('Please fill in all fields correctly')
    }
  }

  const handleTogglePassword = () => setShowPassword(prev => !prev)

  return(
    <main className="LoginPage">
      <img height={16} src="./public/logo/big-focus-logo-white-transparent-no-padding.png" alt="Focus Productivity" />
      <h1>Signup</h1>
      <p className="error">{errorMessage}</p>
      <form onSubmit={handleSignup}>
        <input required name="firstname" type="text" onChange={handleInputChange} value={formData.firstname} placeholder="Firstname"/>
        <input required name="email" type="email" onChange={handleInputChange} value={formData.email} placeholder="Email"/>
        <input required name="password" type={ showPassword ? "text" : "password"} onChange={handleInputChange} value={formData.password} placeholder="Password"/>
        <button type="button" className="show-password-button" onClick={handleTogglePassword}>
          { showPassword ?
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480.18-353.85q60.97 0 103.47-42.68t42.5-103.65q0-60.97-42.68-103.47t-103.65-42.5q-60.97 0-103.47 42.68t-42.5 103.65q0 60.97 42.68 103.47t103.65 42.5ZM480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm.11 152q-129.96 0-236.88-70.73Q136.31-381.46 83.08-500q53.23-118.54 160.04-189.27T479.89-760q129.96 0 236.88 70.73Q823.69-618.54 876.92-500q-53.23 118.54-160.04 189.27T480.11-240ZM480-500Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M617.85-454.15 586-486q9-52.38-29.69-90.69Q517.62-615 466-606l-31.85-31.85q10.08-4.15 21.04-6.23 10.96-2.07 24.81-2.07 61.15 0 103.65 42.5 42.5 42.5 42.5 103.65 0 13.85-2.07 25.58-2.08 11.73-6.23 20.27Zm126.46 122.92L714-358q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-31.23-31.23q34.85-13.15 70.92-18.96Q443.77-760 480-760q130.23 0 238.23 71.58 108 71.57 158.69 188.42-21.46 48.23-54.34 90.65-32.89 42.43-78.27 78.12Zm44.61 216.77L633.23-269.69q-26.54 11.77-65.88 20.73Q528-240 480-240q-131 0-238.23-71.58Q134.54-383.15 83.08-500q23.3-53 61.46-99.27 38.15-46.27 81.46-77.65l-111.54-112 28.31-28.31 674.46 674.46-28.31 28.31ZM254.31-648.62q-34.39 24.47-70.31 64.31-35.92 39.85-56 84.31 50 101 143.5 160.5T480-280q34.62 0 69.77-6.73t52.85-13.58L537.38-366q-9.46 5.31-26.38 8.73-16.92 3.42-31 3.42-61.15 0-103.65-42.5-42.5-42.5-42.5-103.65 0-13.31 3.42-29.85 3.42-16.53 8.73-27.53l-91.69-91.24ZM541-531Zm-112.54 56.54Z"/></svg>
          }
        </button>
        <button onClick={handleSignupClick} className={isFormValid ? "accent-button" : ""} type="submit">Create Account</button>
      </form>
      <Link to={'/login'}>Go to Login</Link>
    </main>
  )
}