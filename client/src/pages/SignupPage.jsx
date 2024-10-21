import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'

export const SignupPage = () => {

  const [formData, setFormData] = useState({ firstname: "", email: "", password: "" })
  const [isFormValid, setIsFormValid] = useState(true)

  useEffect(() => {
    const isValid = 
      formData.firstname.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "";
    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSignup = (e) => {
    e.preventDefault()

    console.log(formData)
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