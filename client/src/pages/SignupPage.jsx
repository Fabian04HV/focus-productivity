import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'
import apiClient from "../../api/apiClient"

export const SignupPage = () => {

  const [formData, setFormData] = useState({ firstname: "", email: "", password: "" })
  const [isFormValid, setIsFormValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

    // console.log(formData)

    apiClient.post('/signup', formData)
    .then(response => {
      console.log('Signup Response: ', response)
    })
    .catch(error => {
      console.error(error)
      // TODO: front-end error handling
    })
  }

  return(
    <main className="LoginPage">
      <img height={16} src="./public/logo/big-focus-logo-white-transparent-no-padding.png" alt="Focus Productivity" />
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input required name="firstname" type="text" onChange={handleInputChange} value={formData.firstname} placeholder="Firstname"/>
        <input required name="email" type="email" onChange={handleInputChange} value={formData.email} placeholder="Email"/>
        <input required name="password" type="password" onChange={handleInputChange} value={formData.password} placeholder="Password"/>
        <button disabled={!isFormValid} className={isFormValid ? "accent-button" : ""} type="submit">Create Account</button>
      </form>
      <Link to={'/login'}>Go to Login</Link>
    </main>
  )
}