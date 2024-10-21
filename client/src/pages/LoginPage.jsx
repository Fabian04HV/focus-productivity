import React from "react"
import { Link } from 'react-router-dom'
import '../styles/LoginPage.css'

export const LoginPage = () => {

  const handleLogin = (e) => {
    e.preventDefault()

    const formData = e.target
    console.log(formData)
  }

  return (
  <main className="LoginPage">
    <img height={16} src="./public/logo/big-focus-logo-white-transparent-no-padding.png" alt="Focus Productivity" />
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input required type="email" placeholder="Email"/>
      <input required type="password" placeholder="Password"/>
      <button type="submit">Login</button>
    </form>
    <Link to={'/signup'}>Go to Signup</Link>
  </main>
  )
}